import React, { useEffect, useState } from 'react';

const Posts = () => {

     function GetCompletedTasks() {
        const [tasks, setTasks] = useState([]);
       
        useEffect(() => {
          fetch("https://localhost:5126/api/OrderItems", {
            method: "GET",
            headers: {
              "Authorization": "Bearer " + localStorage.getItem("Token"),
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              if (!res.ok) {
                throw new Error("Not Found");
              }
              return res.json();
            })
            .then((data) => {
              console.log(data);
              setTasks(data);
            })
            .catch((error) => {
              console.error(error);
            });
        }, []);
      
        return tasks;
      }
      const tasks = GetCompletedTasks();


console.log(tasks)
console.log(localStorage.getItem("token"))

  if (!tasks) {
    return <div>Loading...</div>;
  }
  return (
    <ul>
      {tasks.map((task, index) => {
        return (
          <li key={index}>
            <div>Order Item Id: {task.orderItemId}</div>
            <div>Order Id: {task.orderId}</div>
            <div>Item Id: {task.itemId}</div>
            <div>Quantity: {task.quantity}</div>
            <div>Price: {task.price}</div>
            <div>Order: {task.order}</div>
          </li>
        );
      })}
    </ul>
  );
  
};

export default Posts;