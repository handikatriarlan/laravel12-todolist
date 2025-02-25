import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Skeleton } from '@/components/ui/skeleton';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Props, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'To Do', href: '/to-do' }];

export default function ToDo({ todos }: Props) {
    const { data, setData, post, patch, delete: destroy, processing } = useForm({ task: '' });
    const [loading, setLoading] = useState(false);

    function submit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        post(route('to-do.store'), {
            onSuccess: () => {
                setData('task', '');
                setLoading(false);
            },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Todo" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Section: Statistik atau Header */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card className="relative aspect-video overflow-hidden">
                        <PlaceholderPattern className="stroke-muted-foreground/20 dark:stroke-muted/20 absolute inset-0 size-full" />
                        <CardHeader>
                            <CardTitle className="text-xl">Total Tugas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <span className="text-4xl font-bold">{todos.length}</span>
                        </CardContent>
                    </Card>
                    <Card className="relative aspect-video overflow-hidden">
                        <PlaceholderPattern className="stroke-muted-foreground/20 dark:stroke-muted/20 absolute inset-0 size-full" />
                        <CardHeader>
                            <CardTitle className="text-xl">Tugas Selesai</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <span className="text-4xl font-bold">{todos.filter((t) => t.is_completed).length}</span>
                        </CardContent>
                    </Card>
                    <Card className="relative aspect-video overflow-hidden">
                        <PlaceholderPattern className="stroke-muted-foreground/20 dark:stroke-muted/20 absolute inset-0 size-full" />
                        <CardHeader>
                            <CardTitle className="text-xl">Tugas Belum Selesai</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <span className="text-4xl font-bold">{todos.filter((t) => !t.is_completed).length}</span>
                        </CardContent>
                    </Card>
                </div>

                {/* Section: List Tugas */}
                <div className="border-muted dark:border-muted-foreground relative min-h-[100vh] flex-1 rounded-xl border p-6 md:min-h-min">
                    <div className="absolute inset-0 size-full">
                        <PlaceholderPattern className="stroke-muted-foreground/20 dark:stroke-muted/20 absolute inset-0 size-full" />
                    </div>

                    <h2 className="mb-4 text-2xl font-semibold">Daftar Tugas</h2>

                    {/* Form Tambah Tugas */}
                    <form onSubmit={submit} className="mb-6 flex gap-2">
                        <Input
                            type="text"
                            value={data.task}
                            onChange={(e) => setData('task', e.target.value)}
                            placeholder="Tambah tugas baru..."
                            className="flex-1"
                        />
                        <Button type="submit" disabled={processing || loading} className="gap-2">
                            <PlusCircle className="size-4" />
                            Tambah
                        </Button>
                    </form>

                    {/* List Tugas */}
                    <div className="space-y-4">
                        {todos.length === 0 ? (
                            <p className="text-muted-foreground">Belum ada tugas.</p>
                        ) : (
                            todos.map((todo) => (
                                <div key={todo.id} className="bg-card flex items-center justify-between rounded-md border p-4">
                                    <div className="flex items-center gap-3">
                                        <Checkbox checked={todo.is_completed} onCheckedChange={() => patch(route('to-do.update', todo.id))} />
                                        <span className={cn('text-lg', { 'text-muted-foreground line-through': todo.is_completed })}>
                                            {todo.task}
                                        </span>
                                    </div>
                                    <Button variant="destructive" size="icon" onClick={() => destroy(route('to-do.destroy', todo.id))}>
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                            ))
                        )}
                        {loading && <Skeleton className="h-12 w-full rounded-md" />}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
