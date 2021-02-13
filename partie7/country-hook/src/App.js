import React, { useState } from "react";

import { useField } from "./hook/UseField";
import { UseCountry } from "./hook/UseCountry";
import Country from "./Component/Country";

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const { country, isLoading } = UseCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type="submit">find</button>
      </form>

      <Country country={country} isLoading={isLoading} />
    </div>
  );
};

export default App;