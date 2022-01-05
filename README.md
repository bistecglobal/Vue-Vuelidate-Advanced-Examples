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
    
    The simplest way to get started with vuelidate for sub-components/form is to use Vue.js dependency injection mechanism provided by provide/inject pair. The $v instance created in parent component can be shared with children component.
    
    As you more fine tune it, you can use Vuelidate data-nesting and only pass a subset of $v to your subcomponents. This is a roughly similar approach to how Angular does with nested Forms. It would look something like:
    
    ``` bash
    ...
    <BaseName v-model="form.name" :v="$v.form.name"/>
    ...
    <BaseEmail v-model="form.email" :v="$v.form.email" />
    ...
    <script>
      import { required, email } from "vuelidate/lib/validators";
      import { isNameJoe, notGmail, isEmailAvailable } from "@/static/CustomValidators";
      import BaseName from "./BaseName.vue";
      import BaseEmail from "./BaseEmail.vue";

      export default {
        name: "ChildValidation",

        components: { BaseName, BaseEmail },

        data() {
          return {
            form: {
              name: "",
              email: ""
            }
          };
        },

        validations: {
          form: {
            name: { required, isJoe: isNameJoe },
            email: { required, email, notGmail, isEmailAvailable }
          }
        },
      };
    </script>
    ```
    Alternately, you can declare independent instances of $v for each component. In your case, you will have one for parent and two for children. When you hit the submit button, get the reference of child component using $refs and check if nested form within the child component is valid or not.
    
  * Child Validation With Error

    There are two common ways of considering if an error should be displayed. It is important to understand which one suits your use case better. You can use either **$error**       or **$anyError** validation property, or by extension, the low-level variants: **$dirty** or **$anyDirty**. Note that this project uses mainly **$error** variant in this         example, but the choice is yours to make.
    
    Simply, errors can be configured to display in child components as follow;
    ``` bash
    ...
    <div class="text-sm mt-2 text-red" v-if="v.$error">
      <div v-if="!v.required">Name is a required</div>
      <div v-if="!v.isJoe">Name must be Joe</div>
    </div>
    ...
    ```

  * Child Validation With Vuelidate-Error-Extractor / Custom error extractor with Validation Summary
  
    Vuelidate-error-extractor exports a few things, but you can import them separately from their files if your bundles include more than what you use (don't get tree shaken).
    
    ![image](https://user-images.githubusercontent.com/24666411/148203341-03bbc6aa-1026-4d58-a6f5-1202b9b30306.png)

    This was the absolute minimum to use the **plugin**.

    The two main installation properties you should provide are template and messages.

    * template tells the plugin to use the template you provide. we have used the out of the box template, but you can use your own.
    * messages is the collection of error messages corresponding to each of your validation rule names.

    The **Single Error Extractor** is a component that displays the errors for a single form input. It can be used to wrap plain html form inputs or any custom Vue     component.Creating custom templates and styling them, can be done by adding the singleErrorExtractorMixin into your custom **FormGroup** component.
    
    ![image](https://user-images.githubusercontent.com/24666411/148205004-2f66136b-adc3-4988-8636-2566c92ea5f2.png)

    It must be provided a validator prop to be able to extract validation messages from it.  
    
    ![image](https://user-images.githubusercontent.com/24666411/148205255-9f4fcf46-38df-48c4-a654-c497a0de6a15.png)
    This is the basic usage of the provided form-group component. It should be passed a validator and optionally a label. The label is used to display a label above the component and optionally fill in the {attribute} placeholder in validation messages.
    
    Custom Messages
    
    Passing a messages prop can allow for overriding the globally defined error messages with ones just for this component. Perfect for when you want a specific validation message that is not applicable anywhere else.
    ``` bash
    <template>
      <form-group 
        :validator="$v.first_name" 
        :messages="localMessages"
        label="User's First Name" 
        attribute="Name" 
      >
        <input type="text" v-model="first_name"/>
      </form-group>
    </template>

    <script>
    export default {
      data() {
        return {
          first_name: '',
          localMessages: { 
            required: 'Field {attribute} should be filled in.' 
          }
        }
      },
      validations: {
        first_name: { required }
      }
    }
    </script>
    ```
    
    The Multi Error Extractor is a component that displays all the errors of a form. It can receive a validator object either from a direct prop or via a FormWrapper.
    An attributes prop cam be passed to identify each field's name in the form. Passing a local attributes prop will override the global attributes.
    
    The multiErrorExtractor component is not registered by default. Import either one of the prebuilt templates or the baseMultiErrorExtractor and build your own.
    
    ![image](https://user-images.githubusercontent.com/24666411/148207386-d802f512-fdb9-4f74-a1c8-e9bde8e5919d.png)

    This is the basic usage of a multi-error-extractor component. By default, it expects a validator object to be passed.
    ``` bash
    <form-summary :validator="$v.form"/>
    ```
  * Child Validation by reducing boilerplate code

    The **FormWrapper** component is used to pass a validator object to all error extractor elements inside it, no matter how deeply nested. This works with both the Single Error  Extractor and the Multi Error Extractor, allowing the user to skip passing the validator object to each form field. You can even skip passing the attribute property as it can be extracted automatically.

    You need to register the FormWrapper as a new Vue component. How you name it is up to you. In this example, we have registered in vuelidate.js.

    Reusable Attributes
    
    To benefit from automatic attribute extraction, define an attributes option in your Vuelidate-error-extractor initial setup.

    That way fields with the same name like email or name can get automatically replaced with E-mail or User Name in your error messages.
    
    ![image](https://user-images.githubusercontent.com/24666411/148239578-bbe6f78d-c278-42a1-8049-78bb01a4d177.png)
    
    You have to pass the validator prop which is your form object's Vuelidate validation. Its a good practice to wrap your forms in an object.
    
    The FormWrapper is a component that has no markup, just a slot that renders everything passed to it. It expects one prop, validator that it passes down to all the error extractor components via the provide/inject API.
    
    The child component will be as follow;

    ![image](https://user-images.githubusercontent.com/24666411/148240062-bfd1dc8b-06fe-4149-ab22-1443836afa16.png)


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
