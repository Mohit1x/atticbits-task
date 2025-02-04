import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/DummyList.css";
import Sidebar from "../components/Sidebar";

const DummyList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newItem, setNewItem] = useState({ title: "", body: "" });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://67a1b33c5bcfff4fabe32550.mockapi.io/posts/lists"
      );
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newItem.body.length < 10 && newItem.title < 5) {
      setError("please fill the Title or Body properly!");
    }
    try {
      const response = await axios.post(
        "https://67a1b33c5bcfff4fabe32550.mockapi.io/posts/lists",
        newItem
      );
      setItems([response.data, ...items]);
      setNewItem({ title: "", body: "" });
    } catch (error) {
      console.error("Error posting item:", error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="dummy-list">
        <h2>Dummy List</h2>

        <form onSubmit={handleSubmit} className="post-form">
          <input
            type="text"
            placeholder="Title"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          />
          <textarea
            onFocus={() => setError("")}
            placeholder="Body"
            value={newItem.body}
            onChange={(e) => setNewItem({ ...newItem, body: e.target.value })}
          />
          {error && <span className="error">{error}</span>}
          <button type="submit">Add Item</button>
        </form>

        {isLoading ? (
          "Loading....."
        ) : (
          <div className="items-list">
            {items.map((item) => (
              <div className="items-container">
                <h2>{item.id} .</h2>
                <div key={item.id} className="item-card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DummyList;
