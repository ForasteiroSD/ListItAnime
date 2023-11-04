import "./Login.css";

function Login() {
  return (
    <div className="login">
      <div className="logo" />
      <form>
        <div className="login-data">
          <div>
            <h1>Log in</h1>
            <p>Welcome! Please enter your details</p>
          </div>
          <div className='inputs'>
            <label for="email">Email</label>
            <input type="text" id="email" name="email" placeholder='Enter your email'/>
          </div>
          <div className='inputs'>
            <label for="senha">Password</label>
            <input type="password" id="senha" name="senha" placeholder='•••••••••••'/>
          </div>
          <div className="buttons">
            <button>Sign In</button>
          </div>
          <p className='create'>Don't have an account? <span>Sign Up</span></p>
        </div>
      </form>
    </div>
  );
}

export default Login;
