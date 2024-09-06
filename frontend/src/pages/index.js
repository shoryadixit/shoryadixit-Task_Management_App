import TaskList from "@/components/TaskList";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { authState, paginationState, tasksState } from "@/recoil/atom";
import { ExitIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { toast } from "sonner";

export default function Home() {
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [auth, setAuth] = useRecoilState(authState);
  const [pagination, setPagination] = useRecoilState(paginationState);
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated) router.push("/auth");
  }, [auth]);

  const fetchTasks = async (updateTasks, filters = {}) => {
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, { params: filters })
        .then((response) => {
          const { docs, ...rest } = response.data;
          updateTasks(docs);
          setPagination(rest);
        });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks(setTasks);
  }, []);

  const handleLogout = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      })
      .then((res) => {
        localStorage.removeItem("user");
        setAuth({
          isAuthenticated: false,
          user: null,
        });
        router.push("/auth");
      })
      .catch((error) => {
        console.log("Error logging out:", error);
        toast.error("Error logging out. Please try again.", {
          description: error?.response?.data?.error,
        });
      });
  };

  return (
    <div className={`my-4 md:my-6 mx-4 lg:mx-6 lg:p-4 relative`}>
      {tasks ? (
        <TaskList
          tasks={tasks}
          fetchTasks={fetchTasks}
          setTasks={setTasks}
          tasksPagination={pagination}
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-2xl font-bold">No tasks found.</p>
        </div>
      )}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            onClick={() => handleLogout()}
            className="group absolute top-5 right-5 sm:top-10 sm:right-10"
          >
            <div className="text-white group-hover:p-4 bg-red-500 p-1 transition-all ease-in-out duration-500 rounded-full bg-opacity-60">
              <ExitIcon className="group-hover:block hidden delay-300" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-red-400 dark:bg-opacity-50 bg-opacity-80 dark:bg-red-400 font-bold text-white dark:text-white">
            Logout
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
