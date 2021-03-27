import React, { useEffect, useState } from 'react'
import { database } from '../../firebase';
import { firebaseLooperTwo } from '../../utils/tools';
import TestData from './TestData';

const Tests = () => {

     const [batch, setBatch] = useState([]);

  useEffect(() => {
        database.ref('recipes/').get().then((snapshot) => {
            const data = firebaseLooperTwo(snapshot)
            console.log(data)
            setBatch(data)
           
        })
      })

    return (
        <div>
            {
                batch.map(data => (
                    <div>
                        <TestData data={data.arrayList}/>
                    </div>
                ))
            }
        </div>
    )
}

export default Tests
