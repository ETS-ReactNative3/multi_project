import React, { Suspense, useContext,useEffect } from 'react';
import {AuthContext} from '../../context/Auth/AuthContext';
import {

  Row,
  Spinner
} from 'reactstrap';

import NumberUser from './NumberUser';
import NumberOrders from './NumberOrders';
import NumberProducts from './NumberProducts';
import NumberComments from './NumberComments';
import NumberCanceledOrders from './NumberCanceledOrders';
import NumberSeller from './NumberSeller';
import OrdersStatus from './OrdersStatus';
import GenderStatus from './GenderStatus';
import UsersStatus from './UsersStatus';
import PaymentsStatus from './PaymentsStatus';
import NumberStatus from './NumberStatus';

const Dashboard =(props)=>{
  const {dispatch} = useContext(AuthContext);
  useEffect(()=>{
    dispatch({type:'check',payload:props});
  },[])
 
    return (
      <div className="animated fadeIn">
        <Row>
          <Suspense fallback={<Spinner />}>
            <NumberUser />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <NumberOrders />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <NumberProducts />
          </Suspense>
        </Row>

        
        <Row className="cols-2">
        <Suspense fallback={<Spinner />}>
            <NumberStatus />
          </Suspense>

          <Suspense fallback={<Spinner />}>
            <OrdersStatus />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <UsersStatus />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <PaymentsStatus />
          </Suspense>
            <Suspense fallback={<Spinner />}>
                <GenderStatus />
            </Suspense>
        </Row>
        <Row>
          <Suspense fallback={<Spinner />}>
            <NumberComments />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <NumberCanceledOrders />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <NumberSeller />
          </Suspense>
        </Row>   
      </div>
    );
  
}

export default Dashboard;
