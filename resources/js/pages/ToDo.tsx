import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem, Todo } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { AlertCircle, Loader2, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'To Do', href: '/to-do' }];

export default function ToDo() {
    const { todos } = usePage<{ todos: Todo[] }>().props;
    const [newTask, setNewTask] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);
    const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const addTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        setIsSubmitting(true);

        router.post(
            route('to-do.store'),
            { task: newTask },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setNewTask('');
                    toast.success('New to-do successfully added.');
                },
                onError: (errors) => {
                    console.error('Error adding task:', errors);
                    toast.error('Failed to add new to-do.');
                },
                onFinish: () => setIsSubmitting(false),
            },
        );
    };

    const toggleTodo = (todo: Todo) => {
        const newStatus = !todo.is_completed;

        router.put(
            route('to-do.update', todo.id),
            { is_completed: newStatus },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.info(`To-do "${todo.task}" ${newStatus ? 'completed' : 'incomplete'}.`);
                },
                onError: (errors) => {
                    console.error('Error updating task:', errors);
                    toast.error('Failed to change to-do status.');
                },
            },
        );
    };

    const confirmDelete = (todo: Todo) => {
        setTodoToDelete(todo);
        setIsDialogOpen(true);
    };

    const deleteTodo = () => {
        if (!todoToDelete) return;

        setIsDeleting(todoToDelete.id);
        setIsDialogOpen(false);

        router.delete(route('to-do.destroy', todoToDelete.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.error('To-do successfully deleted.');
                setTodoToDelete(null);
            },
            onError: (errors) => {
                console.error('Error deleting task:', errors);
                toast.error('Failed to delete to-do.');
            },
            onFinish: () => setIsDeleting(null),
        });
    };

    const completedTasks = todos.filter((t) => !!t.is_completed).length;
    const incompleteTasks = todos.filter((t) => !t.is_completed).length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Todo" />
            <Toaster position="top-right" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card className="relative aspect-video overflow-hidden">
                        <div className="pointer-events-none absolute inset-0">
                            <PlaceholderPattern className="stroke-muted-foreground/20 dark:stroke-muted/20 size-full" />
                        </div>
                        <CardHeader>
                            <CardTitle>Todos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <span className="text-4xl font-bold">{todos.length}</span>
                        </CardContent>
                    </Card>
                    <Card className="relative aspect-video overflow-hidden">
                        <div className="pointer-events-none absolute inset-0">
                            <PlaceholderPattern className="stroke-muted-foreground/20 dark:stroke-muted/20 size-full" />
                        </div>
                        <CardHeader>
                            <CardTitle>Completed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <span className="text-4xl font-bold">{completedTasks}</span>
                        </CardContent>
                    </Card>
                    <Card className="relative aspect-video overflow-hidden">
                        <div className="pointer-events-none absolute inset-0">
                            <PlaceholderPattern className="stroke-muted-foreground/20 dark:stroke-muted/20 size-full" />
                        </div>
                        <CardHeader>
                            <CardTitle>Incomplete</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <span className="text-4xl font-bold">{incompleteTasks}</span>
                        </CardContent>
                    </Card>
                </div>

                <Card className="relative min-h-[100vh] flex-1 rounded-xl p-6 md:min-h-min">
                    <div className="pointer-events-none absolute inset-0">
                        <PlaceholderPattern className="stroke-muted-foreground/20 dark:stroke-muted/20 size-full" />
                    </div>

                    <h2 className="mb-4 text-2xl font-semibold">To-do List</h2>

                    <form onSubmit={addTodo} className="mb-6 flex gap-2">
                        <Input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Add a new to-do..."
                            className="flex-1"
                            disabled={isSubmitting}
                        />
                        <Button type="submit" disabled={isSubmitting || !newTask.trim()} className="cursor-pointer gap-2">
                            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <PlusCircle className="size-4" />}
                            Add
                        </Button>
                    </form>

                    <div className="space-y-4">
                        {todos.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <AlertCircle className="text-muted-foreground mb-2 size-12" />
                                <p className="text-muted-foreground">There is no to-do yet. Add a new to-do to start.</p>
                            </div>
                        ) : (
                            todos.map((todo) => (
                                <div
                                    key={todo.id}
                                    className={cn(
                                        'bg-card flex items-center justify-between rounded-md border p-4 transition-all duration-200',
                                        todo.is_completed ? 'text-red-600 line-through' : '',
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative mt-1">
                                            <Checkbox
                                                id={`todo-${todo.id}`}
                                                checked={todo.is_completed === true}
                                                onCheckedChange={() => toggleTodo(todo)}
                                                className="cursor-pointer"
                                            />
                                        </div>
                                        <label
                                            htmlFor={`todo-${todo.id}`}
                                            className={cn(
                                                'mb-1 cursor-pointer text-base transition-all duration-200',
                                                todo.is_completed === true && 'text-muted-foreground line-through',
                                            )}
                                        >
                                            {todo.task}
                                        </label>
                                    </div>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => confirmDelete(todo)}
                                        aria-label="Delete To-do"
                                        className="cursor-pointer"
                                        disabled={isDeleting === todo.id}
                                    >
                                        {isDeleting === todo.id ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                                    </Button>
                                </div>
                            ))
                        )}
                    </div>
                </Card>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                        <DialogDescription>Are you sure you want to delete "{todoToDelete?.task}"?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row justify-end gap-2 sm:justify-end">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="cursor-pointer">
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={deleteTodo} className="cursor-pointer">
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
