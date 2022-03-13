import type { NextPage } from "next";
import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";

type Poem = {
  title: string;
  poet: string;
  text: string;
};

const Post: NextPage = () => {
  const [state, setState] = useState({ title: "", poet: "", text: "" });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const mutation = useMutation((newPoem: Poem) => {
    return axios.post("http://127.0.0.1:8000/api/v1/poems/", newPoem);
  });
  return (
    <div>
      {mutation.isLoading ? (
        "Adding todo..."
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <input
            value={state.title}
            type="text"
            placeholder="title"
            onChange={handleChange}
            name="title"
          />

          <input
            value={state.poet}
            type="text"
            placeholder="poet"
            onChange={handleChange}
            name="poet"
          />

          <textarea
            value={state.text}
            placeholder="text"
            onChange={handleChange}
            name="text"
          />
          <button
            onClick={() => {
              mutation.mutate({
                poet: state.poet,
                title: state.title,
                text: state.text,
              });
            }}
          >
           add poem
          </button>
        </>
      )}
    </div>
  );
};

export default Post;
