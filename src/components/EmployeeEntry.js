import React from "react";

function Employee(props) {
  return (
    <tr>
      <td className="img-container">
        <img
          alt={"thumbnail-" + props.firstName + "-" + props.lastName}
          src={props.image}
        />
      </td>
      <td className="first-name">{props.firstName}</td>
      <td className="last-name">{props.lastName}</td>
      <td>{props.phone}</td>
      <td className="email">{props.email}</td>
      <td className="screen-name">{props.screenName}</td>
    </tr>
  );
}

export default Employee;
