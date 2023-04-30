const LoadingPulse = () => {
    return (
        <div className="shadow rounded-md p-4 w-full">
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-800 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-800 rounded"></div>
                <div className="h-2 w-20 bg-slate-800 rounded"></div>
                </div>
            </div>
</div>
    )
}

export default LoadingPulse;