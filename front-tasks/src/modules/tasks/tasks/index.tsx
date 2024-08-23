import { useMutation, useQuery } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import { format } from "date-fns";
import { useState } from "react";
import { axiosInstance } from "../../../axiosInstance";
import { queryClient } from "../../../queryClient";
import { taskService } from "../../../services/task.service";
import { Task } from "../../components";

export function Tasks() {
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    date: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const { data, ...query } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => taskService(axiosInstance).getTasks(),
    initialData: [],
  });

  const { mutate } = useMutation({
    mutationFn: taskService(axiosInstance).createTask,
    onError(error) {},
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
        type: "active",
      });
      setNewTask({ name: "", description: "", date: "" });
    },
  });

  const handleAddTask = () => {
    mutate({
      name: newTask.name,
      description: newTask.description,
      start_date: newTask.date,
    });
  };

  if (query.isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h1 className="mb-4">Task List</h1>
          {data.map((task) => (
            <div key={task.id} className="mb-4">
              <Task
                {...task}
                date={format(new Date(task.start_date), "dd/MM/yyyy")}
              />
            </div>
          ))}
        </div>
        <div className="col-md-6">
          <h1 className="mb-4">Add New Task</h1>
          <form>
            <div className="form-group mb-3">
              <label>Task Name:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={newTask.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Task Description:</label>
              <textarea
                className="form-control"
                name="description"
                value={newTask.description}
                //@ts-ignore
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Due Date:</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={newTask.date}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddTask}
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
