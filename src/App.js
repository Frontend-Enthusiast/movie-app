import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [endPoint, setEndPoint] = useState('');
  const [container, setContainer] = useState([]);
  const [finalPoint, setFinalPoint] = useState('');
  useEffect(() => {
    fetchMe();
  }, [finalPoint]);

  const fetchMe = () => {
    const url = `https://imdb8.p.rapidapi.com/auto-complete?q=+${endPoint}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'bb96b1cebemsh3123e51054d1fd4p1eea2djsn826f02d6547c',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      }
    };
    const getApi = async () => {
      try {
        const response = await fetch(url, options);
        await response.json().then(data => {
          setContainer(data.d);
          setEndPoint('');
        });
      } catch (error) {
        console.log(error);
      }
    }
    getApi();
  }
  const getPhoto = (i) => {
    let obj = { ...i };
    return obj.imageUrl;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setFinalPoint(endPoint);
  }
  return (
    <div className="App">
      <form className='movie__search' onSubmit={handleSubmit}>
        <input type='text' value={endPoint} onChange={e => setEndPoint(e.target.value)} />
        <button className='btn'>Submit</button>
      </form>
      <div className='movies'>
        {container.map((item, index) => {
          return (
            <div className='movie' key={index}>
              <p className='movie__name'>{item.l}</p>
              <img className='movie__image' src={getPhoto(item.i)} alt='No banner available'></img>
              <p className='movie__cast'>{item.s}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
