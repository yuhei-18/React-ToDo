import React from "react";

interface PropsType {
  todo?: Api.Todo;
}

const Detail: React.FC<PropsType> = (props) => {
  const { todo } = props;

  return(
    <>
      <h1>{todo?.title}</h1>
    </>
  )
};

export default Detail;