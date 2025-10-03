import React, { useState } from 'react';

export default function MessageInput({ onSend, disabled = false }: { onSend: (text: string) => Promise<void> | void; disabled?: boolean }){
    const [value, setValue] = useState('');

    const submit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!value.trim()) return;
        await onSend(value.trim());
        setValue('');
    }

    return (
        <form onSubmit={submit} className="flex gap-2">
            <input aria-label="Message" value={value} onChange={(e) => setValue(e.target.value)} className="input flex-1" placeholder="Ask about AI policy..." />
            <button type="submit" disabled={disabled} className="btn btn-primary">Send</button>
        </form>
    )
}