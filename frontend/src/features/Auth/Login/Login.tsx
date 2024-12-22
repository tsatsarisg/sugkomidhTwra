import styles from "../Auth.module.css";

const Login = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup Data:");
    // Handle signup logic
  };

  return (
    <form onSubmit={handleSubmit} className={styles.authForm}>
      <div className={styles.formField}>
        <label htmlFor="email" className={styles.formLabel}>
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className={styles.formInput}
          required
        />
      </div>
      <div className={styles.formField}>
        <label htmlFor="password" className={styles.formLabel}>
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className={styles.formInput}
          required
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Sign Up
      </button>
    </form>
  );
};

export default Login;
