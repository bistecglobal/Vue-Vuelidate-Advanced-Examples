# Vuelidate-Advanced-Examples

# Overview

  This project was built using [Vuelidate](https://vuelidate.js.org/) and [Vuelidate Error Extractor](https://www.npmjs.com/package/vuelidate-error-extractor).
  
  Package is installed via npm
  ``` bash
  npm i vuelidate-error-extractor
  ```
# Key features

  * Basic Validation
  
    Note that in this example, the red border, red text, and error message visibility are driven by the presence or absence of the _**hasError**_ class on the surrounding div.
    
    For each value you want to validate, you have to create a key inside validations options with builtin validators(import it from vuelidate library). You can specify when input becomes dirty by using appropriate event on your input box.
    
    Here is a full list of provided validators by Vuelidate.
    ![image](https://user-images.githubusercontent.com/24666411/148164623-d43183b4-89ff-4c42-be77-401d12636a60.png)

    
  * Custom Validation
  
    You can easily write custom validators and combine them with builtin ones, as those are just a simple predicate functions.
    
    Suppose you want a validator that checks if e-mail address does not contain gmail substring in it. The way to approach this is to use normal javascript function that checks that.
    
    ``` bash
    export function notGmail(value = "") {
      return !value || !value.includes("gmail");
    }
    ```
    The second part is actually applying your validator. You can do it exactly the same way as with builtin ones. In this example, "CustomValidators.js" has all the custom validations.
     ``` bash
     import { illegalChars,isNotJoe,notGmail,isEmailAvailable} from "@/static/CustomValidators";
     ...
      validations: {
        form: {
          name: { required, isJoe: isNotJoe, illegalChars },
          email: { required, email, notGmail, isEmailAvailable }
        }
      },
     ```
    
  * Dynamic Rules

    Because the whole validation process is based on computed properties, nothing prevents you from making the validator name dynamic. Such cases allows for very dynamic behaviour even when your data is changing in time.
``` bash
...
computed: {
    rules () {
      return this.step === 1 
        ? { name: { required } } 
        : { email: { required, email } }
    }
  },
validations() {
    return {
      form: this.rules
    }
  },
...
```
In this example, Step 1 only validates the Name by clicking on Next button. And, Step 2 will validate the Email by cilicking on Submit.

  * Child Validation
  * Child Validation With Error
  * Child Validation With Vuelidate-Error-Extractor / Custom error extractor with Validation Summary
  * Child Validation by reducing boilerplate code

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
