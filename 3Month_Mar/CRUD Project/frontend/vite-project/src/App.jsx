import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style.css'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import axios from 'axios'

function App() {
  const [itemName, setItemName] = useState([]);
  const [discription, setDiscription] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [itemData, setData] = useState("");
  const [unit, setUnit] = useState("");

  const handleOnchange = (event) => {
    setItemName(event.target.value)
    console.log('Typing in item name input field value==>', itemName);
  }

  async function submitForm(e) {
    try {
      e.preventDefault();

      const data = {
        name: itemName,
        description: discription,
        purchasePrice: purchasePrice,
        sellingPrice: sellingPrice,
        quantity: quantity,
        unit: unit,
      };

      console.log(data, 'Form Submitted..');

      const apiResponse = await axios.post(
        "http://localhost:9090/api/create-item",
        data
      ).then(console.log("yes")).catch((err) => console.log(err))

      console.log(apiResponse);

      getAllItemsData();

      toast.success('🦄Form Submitted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    }
    catch (err) {
      console.log(err)
    }
  }

  const getAllItemsData = async () => {
    try {

      const apiResponse = await fetch("http://localhost:9090/api/get-all-item");

      const responseData = await apiResponse.json();

      setData(responseData.data);

      console.log(responseData);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllItemsData();
  }, []);

  return (
    <>
      <h2 className='text-danger'>Welcome Mahendra Mernstack Started..</h2>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <h3 className='border text-center'>  Create item</h3>
            <Form className='my-3'>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>item Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter item Name" onChange={(event) => setItemName(event.target.value)} value={itemName} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>discription</Form.Label>
                  <Form.Control type='text' placeholder='Enter Description' onChange={(event) => setDiscription(event.target.value)} value={discription} />
                </Form.Group>
              </Row>
              <Row className='mb-3'>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>purchase price</Form.Label>
                  <Form.Control type="number" placeholder="Enter purchase price" onChange={(event) => setPurchasePrice(event.target.value)} value={purchasePrice} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAddress1">
                  <Form.Label>selling price</Form.Label>
                  <Form.Control type='number' placeholder="Enter selling price" onChange={(event) => setSellingPrice(event.target.value)} value={sellingPrice} />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>quantity</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='enter quantity'
                    onChange={(event) => setQuantity(event.target.value)}
                    value={quantity}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Unit</Form.Label>
                  <Form.Select
                    onChange={(event) => setUnit(event.target.value)}
                    value={unit}
                  >
                    <option value="">Choose...</option>
                    <option>price</option>
                    <option>Box</option>
                    <option>Kg</option>
                    <option>Gram</option>
                    <option>Litter</option>
                  </Form.Select>
                </Form.Group>
              </Row>

              <div className='text-center'>
                <Button variant="primary" type="submit" onClick={submitForm} className='w-50'>
                  Submit
                </Button>

                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </div>
            </Form>
          </div>

          <div className='col-md-6'>
            <h3 className='border text-center'> Get items </h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>item Name</th>
                  <th>Description</th>
                  <th>Purchase price</th>
                  <th>Selling price</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Action</th>

                </tr>
              </thead>
              <tbody>
                {itemData && itemData.map((each,index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{each.name}</td>
                      <td>{each.description}</td>
                      <td>{each.purchasePrice}</td>
                      <td>{each.sellingPrice}</td>
                      <td>{each.quantity}</td>
                      <td>{each.unit}</td>
                      <td className="d-flex">
                        <button className="btn btn-success">Edit</button>
                        <button className="btn btn-danger mx-2">Delete</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;