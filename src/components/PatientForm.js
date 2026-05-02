export default function PatientForm({ data = {}, onChange = () => {} }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Patient Info</h2>
      </div>

      <div className="card-body">
        <input
          placeholder="Name"
          value={data.name || ""}
          onChange={(e) =>
            onChange({ ...data, name: e.target.value })
          }
        />

        <input
          placeholder="Age"
          value={data.age || ""}
          onChange={(e) =>
            onChange({ ...data, age: e.target.value })
          }
        />

        <select
          value={data.gender || ""}
          onChange={(e) =>
            onChange({ ...data, gender: e.target.value })
          }
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <textarea
          placeholder="Symptoms"
          value={data.symptoms || ""}
          onChange={(e) =>
            onChange({ ...data, symptoms: e.target.value })
          }
        />

        <input
          type="date"
          value={data.date || ""}
          onChange={(e) =>
            onChange({ ...data, date: e.target.value })
          }
        />
      </div>
    </div>
  );
}