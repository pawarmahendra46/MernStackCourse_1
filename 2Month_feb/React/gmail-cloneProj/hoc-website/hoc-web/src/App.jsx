import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DetailsCard from "./components/DetailsCard";
{
  /* The following line can be included in your src/index.js or App.js file */
}
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  //javascript
  console.log("dfgdreehhjdjdjrtjtjhhgg....")
  //variable
  const name = "Mahendra"; //we cant change const value
  let age = 30; //we can change let value
  console.log(age, "<==");

  console.log(name, "name===>");

  //string
  const a = "Ramchandra";

  //array
  const b = ["apple", "mango", "test", "pune", 132];
  //object
  const data = {
    name: "test",
    city: "pune",
    age: 24
  };
  //if else -ternari operator
  //functions
  //.map
  //async await
  const fullName = "HOC"
  if (fullName == "HOC") {
    console.log(true)
  } else {
    console.log(false)
  }
  //functions
  function addNumber() {
    console.log("Clicked..")
  }
  const cardData = [
    {
      CardTitle: "Test1",
      cardDescription: "Description1"
    },
    {
      CardTitle: "Test2",
      cardDescription: "Description2"
    },
    {
      CardTitle: "Test3",
      cardDescription: "Description3"
    },
    {
      CardTitle: "Test4",
      cardDescription: "Description4"
    },
    {
      CardTitle: "Test5",
      cardDescription: "Description5"
    },
  ];
  return (
    <>

      <button className='btn btn-primary' onClick={addNumber}>Click Me.</button>

      {/* <div className='container'>
      <div className='row my-2'>
        <div className='col-md-3'>
        <DetailsCard CardTitle="HOC" cardDescription="*Karad*"/>
        </div>
        <div className='col-md-3'>
        <DetailsCard CardTitle="HOC" cardDescription="*Karad*"/>
        </div>
        <div className='col-md-3'>
        <DetailsCard CardTitle="HOC" cardDescription="*Karad*"/>
        </div>
        <div className='col-md-3'>
        <DetailsCard CardTitle="HOC" cardDescription="*Karad*"/>
        </div>
      </div>

    </div> */}

      <div className='container'>
        <div className='row my-2'>

          {/* .map */}
          {
            cardData.map((each) => (
              <div className="col-md-3 mb-4">
                <DetailsCard
                  CardTitle={each.CardTitle}
                  cardDescription={each.cardDescription}
                />
              </div>
            ))
          }

        </div>
      </div>

    </>
  )
}

export default App
