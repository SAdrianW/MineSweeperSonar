// Flood fill

// https://stackoverflow.com/questions/66099102/javascript-minesweeper-opening-whole-mine-free-area-at-once-not-working-proper










const 
  MinesCount = 17  // adjusted values to fit this snippet display area
, gridSz = { r:7, c:20 } // grid  rows x cols
, gridMx = gridSz.r * gridSz.c
, proxim = [ {v:-1,h:-1},  {v:-1,h:0}, {v:-1,h:+1}, {v:0,h:-1}, {v:0,h:+1}, {v:+1,h:-1}, {v:+1,h:0}, {v:+1,h:+1} ] 
    // proxim = proximity options. aka the 8 squares around the evt.target TODO: change to prox

/*------ Functions ------*/

// #what does this punctation mark mean#

// function proximityElement = reduce function on proxim array (a = accumulator? ( vert, hoz))
    // let rowVert = row + vert, colHoz = col + hoz
    // if (rowVert less/equal 0 AND colHoz less/equal 0 AND rowVert lessThan gridSize.rows AND colHoz lessThan gridSize.columns) 
            // push into acc ({p = proxim??? #:# ((rowVert * gridSize.column)+ colHoz)#,# row #:# rowVert #,# col #:# colVert})
    // return value to accumulator. create empty array to store values in.
, prxElm = (r,c) => proxim.reduce((a,{v,h})=>
    { 
    let rv = r+v, ch = c+h;
    if (rv>=0 && ch>=0 && rv<gridSz.r && ch<gridSz.c) a.push({p:((rv * gridSz.c) + ch), r:rv, c:ch} )
    return a
    },[])

, GenNbX = (nb,vMax) => [null].reduce(arr=>
    {
    while (arr.length < nb)
      {
      let numGen = Math.floor(Math.random() * vMax)
      if (!arr.includes(numGen)) arr.push(numGen);
      }
    return arr //.sort((a,b)=>a-b)
    },[])
, minesP = GenNbX( MinesCount, gridMx )
, prxMne = (r,c) => prxElm(r,c).reduce((a,{p})=>minesP.includes(p)?++a:a,0)  // count mines arroub=nd
, td2rcp = td => 
    {
    let r = td.closest('tr').rowIndex -1  // -1 for thead count of rows
      , c = td.cellIndex
      , p = (r * gridSz.c) +c
    return {r,c,p}
    }
, p2rc  = p =>({r: Math.floor(p / gridSz.c), c: (p % gridSz.c)})
, { timE, cFlags, minesArea } = drawTable('mines-area', gridSz, MinesCount )
;
const chrono = (function( timeElm )
  {
  const
    one_Sec = 1000
  , one_Min = one_Sec * 60
  , twoDgts = t => (t<10) ? `0${t}` : t.toString(10)
  , chronos =
    { timZero : null
    , timDisp : timeElm
    , timIntv : null
    , running : false
    }
  , obj =
    { start()
      {
      if (chronos.running) return
      chronos.timDisp.textContent = '00:00'
      chronos.running = true
      chronos.timZero = new Date().getTime()
      chronos.timIntv = setInterval(() =>
        {
        let tim = (new Date().getTime()) - chronos.timZero
        chronos.timDisp.textContent = `${Math.floor(tim/one_Min)}:${twoDgts(Math.floor((tim % one_Min)/one_Sec))}`   
        }
        , 250);
      }
    , stop()
      {
      if (!chronos.running) return
      chronos.running = false
      clearInterval( chronos.timIntv )
      }
    }
  return obj
  }(timE))

function drawTable(tName, gSz, mines )
  {
  let table = document.getElementById(tName)
  //  table.innerHTML = ''  // eraze table

  let tHead  = table.createTHead()
    , tBody  = table.createTBody()
    , xRow   = tHead.insertRow()
    , timE   = xRow.insertCell()
    , cFlags = xRow.insertCell()
    ;
  timE.setAttribute('colspan', gSz.c -4)
  timE.className   = 'time'
  timE.textContent = '0:00'

  cFlags.setAttribute('colspan', 4)
  cFlags.className   = 'flag'
  cFlags.textContent = ' 0/' + mines
  
  for (let r=gSz.r;r--;)
    {
    xRow = tBody.insertRow()
    for(let c = gSz.c;c--;) xRow.insertCell()
    }
  return { timE, cFlags, minesArea: tBody } 
  }
minesArea.onclick = ({target}) =>
  {
  if (!target.matches('td'))        return
  if (target.hasAttribute('class')) return // already done

  chrono.start()

  let {r,c,p} = td2rcp(target)
  
  if (minesP.includes(p))  // you are dead!
    {
    chrono.stop()
    minesArea.className = 'Boom'
    minesP.forEach(p=>  // show mines
      {
      let {r,c} = p2rc(p) 
      let td = minesArea.rows[r].cells[c]
      if (!td.hasAttribute('class')) td.className = 'mineOff'
      })
    minesArea.rows[r].cells[c].className = 'mineBoom'  // this one is for you
    minesArea.querySelectorAll('td:not([class]), td.flag') // jusr disable click 
      .forEach(td=>td.classList.add('off'))               // and cursor
    }
  else
    {
    let explor = [ {p, r, c, m:prxMne(r,c) } ]
      , iExp   = 0
      ;
    while (iExp < explor.length && explor[iExp].m === 0) // Open mine-free area 
      {
      prxElm(explor[iExp].r,explor[iExp].c)  // look around
      .filter(x=>!explor.some(e=>e.p===x.p)) // if not already in
      .forEach(x=>
        {
        M = prxMne(x.r,x.c) 
        if (M>0 ) { explor.unshift( { p:x.p, r:x.r, c:x.c, m:M} ); iExp++ }
        else        explor.push( { p:x.p, r:x.r, c:x.c, m:M} )  // mine-free space
        }) 
      iExp++
      }
    explor.forEach(({r,c,m})=>minesArea.rows[r].cells[c].className = 'm'+m )
  