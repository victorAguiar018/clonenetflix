import react, {useEffect, useState} from 'react'
import MovieRow from './Components/MovieRow'
import tmdb from './tmdb'

export default ()=>{

  const [movieList, setMovieList] = useState([]);

  useEffect(()=>{
    const loadAll = async ()=>{
      //pegando a lista total
      let list = await tmdb.getHomeList();
      setMovieList(list);
    }

    loadAll();
  },[])

  return(
    <div className='page'>  
      <section className='lists'>
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  )
}