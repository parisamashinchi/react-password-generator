import { useState } from "react";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  
  const generatePassword = (checkboxes, length) => {
    let characters = ""; 
    let generatedPassword = "";

    const selectedCheckbox = checkboxes.filter(checkbox => checkbox.status);

    if(selectedCheckbox.length === 0){
        setError('select at least one checkbox');
        return;
    }

    selectedCheckbox.forEach((checkbox) => {
      setError('');
      switch (checkbox.title) {
        case "Include symbols":
          characters += "!@#$%^&*";
            break;
        case "Include upperCase letters":
          characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "Include lowercase letters":
          characters += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Include numbers":
          characters += "0123456789";
          break;
        default:
          return;
      }
    });
    for(let i=0; i<=length ; i++){
       const randomIndex = Math.floor(Math.random() * characters.length)
        generatedPassword += characters[randomIndex]
    }
    setPassword(generatedPassword)
  };

  return { password , error, generatePassword};

};
export default usePasswordGenerator;
