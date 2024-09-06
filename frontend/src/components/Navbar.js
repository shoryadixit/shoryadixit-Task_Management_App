import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { MoonIcon, PlusIcon, SunIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import TaskForm from "./TaskForm";
import { GoGraph } from "react-icons/go";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import AnalyticsDialog from "./AnalyticsDialog";
import { useRecoilState } from "recoil";
import { authState, paginationState, tasksState } from "@/recoil/atom";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [pagination, setPagination] = useRecoilState(paginationState);
  const [auth, setAuth] = useRecoilState(authState);
  const router = useRouter();

  console.log("auth", auth);

  useEffect(() => {
    if (auth.isAuthenticated) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    setAuth({
      isAuthenticated: !!localStorage.getItem("user"),
      user: JSON.parse(localStorage.getItem("user")),
    });
  }, []);

  const fetchTasks = async () => {
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/tasks`)
        .then((response) => {
          const { docs, ...rest } = response.data;
          setTasks(docs);
          setPagination(rest);
        });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <nav
      className={`bg-transparent fixed z-20 top-0 backdrop-blur-md p-4 shadow-lg items-center flex w-full justify-between`}
    >
      <Link href="/">
        <h2 className="scroll-m-20 pb-2 text-md md:text-3xl font-semibold tracking-tight first:mt-0">
          Task Manager
        </h2>
      </Link>
      <Button
        variant="secondary"
        onClick={() =>
          theme === "light" ? setTheme("dark") : setTheme("light")
        }
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      <div className="flex gap-2 items-center">
        <TaskForm
          setTasks={setTasks}
          fetchTasks={fetchTasks}
          trigger={
            <Button variant="outline" asChild>
              <DialogTrigger className="flex items-center justify-between gap-1">
                <PlusIcon />{" "}
                <span className="hidden md:block">Create Task</span>
              </DialogTrigger>
            </Button>
          }
        />

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center justify-between gap-1"
            >
              <GoGraph /> <span className="hidden md:block">Analytics</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl">
            <AnalyticsDialog />
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
};

export default Navbar;
