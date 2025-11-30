import React from 'react'
import Nav from '../Nav'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { placedOrder, showCart, singleProductBuy } from '../config/redux/action'
import { handleError, handleSuccess } from '../../util/util'
import { unwrapResult } from '@reduxjs/toolkit'

function Buy() {
  let { id } = useParams();
  const validate = (info) => {
    if (info.address == '') return "Please enter the address";
    else if (info.city == '') return "Please enter the city";
    else if (info.zip == '') return "Please enter the zip";
    else if (!info.check) return "Please accept term and conditions";
    return 'success';

  }

  const [info, setInfo] = useState({
    address: "",
    city: "",
    state: "Gujarat",
    zip: "",
    mode: "Cash",
    check: false
  });

  const { cartItems, cartItemsStatus, isLogin, singleProductStatus, singleProduct } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  let count = 1;
  let navigate = useNavigate();
  let [data, isData] = useState([]);
  useEffect(() => {
    if (id === 'cart') dispatch(showCart());
    dispatch(singleProductBuy({ id }));
  }, [])
  let sum = 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate(info) != 'success') {
      handleError(validate(info));
      return;
    }
    // let res = await axios.post(`http://localhost:8000/order/${user.id}/`, {data , info , sum}, configHeaders , {withCredentials : true} )
    let result = unwrapResult(await dispatch(placedOrder({ data, info, sum })));
    let { status } = result;
    if (status) {
      handleSuccess('Order Placed Successfuly');
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } else {
      handleError('some issue during placing the order , try again later');
    }
    setInfo({
      address: "",
      city: "",
      state: "Gujarat",
      zip: "",
      mode: "Cash",
      check: true
    });
  }
  return (

    <div className='container flex-grow-1 p-3'>
      <Nav />
      <h1 className='text-center fw-bold mb-4'>Order</h1>
      <table class="table p-2 m-2 mb-4 fs-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product</th>
            <th scope="col">Qty.</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {!singleProductStatus && cartItemsStatus && cartItems.map((element) => {
            sum += element.product.price * element.qty;
            return (
              <tr>
                <th scope="row">{count++}</th>
                <td>{element.product.name}</td>
                <td>{element.qty}</td>
                <td>₹{element.product.price * element.qty}</td>
              </tr>
            )
          })}
          {singleProductStatus && singleProduct.map((element) => {
            sum += element.product.price * element.qty;
            return (
              <tr>
                <th scope="row">{count++}</th>
                <td>{element.product.name}</td>
                <td>{element.qty}</td>
                <td>₹{element.product.price * element.qty}</td>
              </tr>
            )
          })}
          <tr>
            <th scope="row"></th>
            <td><strong>Total</strong></td>
            <td></td>
            <td>₹{sum}</td>
          </tr>
        </tbody>
      </table>



      {isLogin &&

        <form className='mt-5' >
          <h1 className='text-center m-2'>Address Details</h1>
          <div class="form-group mb-2">
            <label for="address" className='fs-5'>Address</label>
            <input type="text" class="form-control p-2" id="address" placeholder="1234 Main St" value={info.address} onChange={(e) => setInfo({ ...info, address: e.target.value })} />
          </div>
          <div class="row">
            <div class="form-group col-md-6 col-lg-6 mb-2">
              <label for="city" className='fs-5'>City</label>
              <input type="text" class="form-control p-2" id="city" value={info.city} onChange={(e) => setInfo({ ...info, city: e.target.value })} />
            </div>
            <div class="form-group col-md-4 col-lg-4 mb-2">
              <label for="inputState" className='fs-5'>State</label>
              <select id="inputState" class="form-control p-2" value={info.state} onChange={(e) => setInfo({ ...info, state: e.target.value })} >
                <option selected>Gujarat</option>
                <option>Punjab</option>
                <option>Mumbai</option>
                <option>Delhi</option>
              </select>
            </div>
            <div class="form-group col-md-2 col-lg-2 mb-2">
              <label for="zip" className='fs-5'>Zip</label>
              <input type="text" class="form-control p-2" id="zip" value={info.zip} onChange={(e) => setInfo({ ...info, zip: e.target.value })} />
            </div>
          </div>
          <div class="form-group mb-4">
            <label for="mode" className='fs-5'>Payment Mode</label>
            <select id="mode" class="form-control p-2" value={info.mode} onChange={(e) => setInfo({ ...info, mode: e.target.value })}>
              <option selected>Cash</option>
              <option>Online</option>
            </select>
          </div>
          <div class="form-group">
            <div class="form-check mb-2 mt-3">
              <input class="form-check-input" type="checkbox" id="check" checked={info.check} onChange={(e) => setInfo({ ...info, check: !info.check })} />
              <label class="form-check-label fs-5" for="check">
                I Agree <a href='#'>Terms & Conditions</a>
              </label>
            </div>
          </div>
          <div className='d-flex flex-column align-items-center justify-column-center'>
            <p></p>
            <button type="submit" class="btn btn-primary w-50 p-2" onClick={handleSubmit}>Place Order</button>
          </div>
        </form>}
      <ToastContainer />
    </div>
  )
}

export default Buy