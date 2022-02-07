import React, { useEffect, useState } from 'react'
import './App.css'
import  tmdb  from './tmdb'
import MovieRow from './Components/MovieRow'
import FeaturedMovies from './Components/FeaturedMovies'
import Header from './Components/Header'



export default ()=>{

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async ()=>{
      //pegando a lista total
      let list = await tmdb.getHomeList();
      setMovieList(list);

      //Pegando o feature
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen];
      let choseInfo = await tmdb.getMovieInfo(chosen.id, 'tv')
      setFeatureData(choseInfo);
      
    } 

    loadAll();
  },[]);

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener)

    return ()=>{
      window.removeEventListener('scroll', scrollListener)
    }
  },[])

  return(
    <div className='page'> 

      <Header black={blackHeader}/>

      {featureData && 
        <FeaturedMovies item={featureData}/>
      }

      <section className='lists'>
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com <span role='img' aria-label='coração'></span>
        Direitos de imagem para NetFlix <br/>
        Dados Pegos do site Themoviebd.org
      </footer>
      {movieList.length <=0 && 
        <div className='loading'>
            <img src='https://c.tenor.com/DQyztbEmqnYAAAAC/netflix-loading.gif' alt='Carregando'/>
        </div>
      }
    </div>
  );
}