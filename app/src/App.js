import { useState, useEffect } from 'react';
import './App.css';

const endpoint = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const recordsPerPage = 10;


function Pagination ({currentPage, setCurrentPage, totalPages}) {

  const handlePrev = () => {

    if (currentPage > 1) {
      setCurrentPage(prev => prev-1)
    }
    
  } 
  
  const handleNext = () => {

    if (currentPage != totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  return (
    <div style={{
      display : 'flex',
      justifyContent : 'center',
      alignItems : 'center',
      gap : '10px'
    }} >
      <button className='button' 
      onClick={handlePrev}
      >Previous</button>
      <p className='pageText' >1</p>
      <button className='button' 
      onClick={handleNext}>Next</button>
    </div>
  )

}


function App() {

  const [currentPage, setCurrentPage] = useState(1);
  const [employeeData, setEmployeeData] =useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [visibleData, setVisibleData] = useState([]);


  useEffect(() => {

    const fetchData = () => {

      fetch(endpoint)
      .then(data => data.json())
      .then(data => setEmployeeData(data))
      .catch(error => window.alert("failed to fetch data"))

    }
    fetchData();

  }, [])

  // useEffect to calculate start and end
  useEffect(() => {

    const start = (currentPage-1) * recordsPerPage;
    const end = Math.min(currentPage * recordsPerPage, employeeData.length);

    setVisibleData(employeeData.slice(start, end));
    setTotalPages(Math.max(employeeData.length/recordsPerPage));

  }, [employeeData, currentPage])

  





  return (
    <div className="App">
      <h1>Employee Data Table</h1>

      <div style={{
        width:'90%'
      }} >
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {
              visibleData.map((item) => {
                return (
                  <tr key={item.id} >
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;
