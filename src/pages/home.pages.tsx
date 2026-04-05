import { useEffect, useState } from 'react'
import NavbarComponent from '../components/navbar.components'

interface Task {
    id: number;
    title: string;
    description?: string;
    isCompleted: boolean;
}


function Homepage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (!title.trim()) {
            alert('Title is required')
            return
        }

        try {
            const res = await fetch(import.meta.env.BACKEND_URL + '/api/v1/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title.trim(),
                    description: description.trim(),
                }),
            })

            const data = await res.json()
            console.log(data)
            fetchTasks();
            setTitle('')
            setDescription('')
            setIsOpen(false)


        } catch (error) {
            console.error('API ERROR:', error)
        }
    }

    const fetchTasks = async () => {
        try {
            const response = await fetch(`${import.meta.env.BACKEND_URL}/api/v1/task`);
            const data = await response.json();

            // Map API result to Task[]
            const mappedTasks: Task[] = data.result.map((item: any) => ({
                id: item.id,
                title: item.title,
                description: item.description,
                isCompleted: item.is_completed,
            }));

            setTasks(mappedTasks);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // ── Toggle completion
    const toggleTask = async (id: number) => {
        const task = tasks.find((t) => t.id === id);
        if (!task) return;

        const newStatus = !task.isCompleted;

        try {
            await fetch(`${import.meta.env.BACKEND_URL}/api/v1/task/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ is_completed: newStatus }),
            });

            setTasks((prev) =>
                prev.map((t) => (t.id === id ? { ...t, isCompleted: newStatus } : t))
            );
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    // ── Delete task
    const deleteTask = async (id: number) => {
        try {
            await fetch(`${import.meta.env.BACKEND_URL}/api/v1/task/${id}`, {
                method: "DELETE",
            });

            setTasks((prev) => prev.filter((t) => t.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    if (loading) {
        return <p className="p-4 text-center">Loading tasks...</p>;
    }

    return (
        <>
            {/* Navbar component*/}
            <NavbarComponent />

            <div className="pt-24 px-6">

                <div className=" pl-5 bg-white p-3 rounded-2xl flex items-center justify-between">

                    {/* Title component*/}
                    <h1 className="text-2xl font-medium text-blue-700 pointer-events-none">
                        All Tasks
                    </h1>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Add Task
                    </button>

                </div>

                {/* listing all tasks  */}
                <div className="max-w-md mx-auto mt-10 p-4">
                    {tasks.length === 0 && <p className="text-center text-gray-400">No tasks available</p>}

                    {tasks.map((task) => (
                        <div key={task.id} className="bg-white p-4 rounded-md shadow  mb-10 ">
                            <h2 className={`font-semibold ${task.isCompleted ? "line-through text-gray-400" : ""}`}>
                                {task.title}
                            </h2>
                            {task.description && <p className="text-sm text-gray-500">{task.description}</p>}
                            <p className={`text-xs mt-1 ${task.isCompleted ? "text-green-600" : "text-yellow-600"}`}>
                                {task.isCompleted ? "Completed" : "Pending"}
                            </p>

                            <div className="mt-2 flex gap-2">
                                <button
                                    onClick={() => toggleTask(task.id)}
                                    className="px-3 py-1 rounded bg-blue-400 text-white text-sm"
                                >
                                    {task.isCompleted ? "Incomplete" : "Complete"}
                                </button>

                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="px-3 py-1 rounded bg-red-400 text-white text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODAL */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

                    <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3"
                        >
                            ✕
                        </button>

                        <h2 className="text-lg font-semibold mb-4">
                            Add New Task
                        </h2>


                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full mb-2 p-2 border rounded"
                            />
                            {!title.trim() && (
                                <p className="text-red-500 text-sm mb-2">
                                    Title is required
                                </p>
                            )}
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full mb-2 p-2 border rounded"
                            />

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded mt-2"
                            >
                                Add Task
                            </button>

                        </form>

                    </div>
                </div>
            )}
        </>
    )
}

export default Homepage