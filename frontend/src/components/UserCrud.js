import React, { useEffect, useState } from "react";
import api from "../api";

export default function UserCrud() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [editingId, setEditingId] = useState(null);

  // Carregar usuários
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/users/${editingId}`, form);
      setEditingId(null);
    } else {
      await api.post("/users", form);
    }
    setForm({ name: "", email: "", age: "" });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email, age: user.age });
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>CRUD Usuários</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Idade"
          type="number"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />
        <button type="submit">{editingId ? "Atualizar" : "Adicionar"}</button>
      </form>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} - {u.email} - {u.age} anos
            <button onClick={() => handleEdit(u)}>Editar</button>
            <button onClick={() => handleDelete(u.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
