import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUserPage = () => {
  const { id } = useParams(); 
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/${id}`, {
          headers: {
            "x-auth-token": token, 
          },
        });
        setForm({ name: response.data.name, email: response.data.email });
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Error fetching user data");
        navigate("/home"); 
      }
    };

    fetchUser();
  }, [id, token, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/${id}`, form, {
        headers: {
          "x-auth-token": token,
        },
      });
      alert("User updated successfully");
      navigate("/home"); 
    } catch (err) {
      console.error(err);
      alert("Error updating user");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUserPage;
