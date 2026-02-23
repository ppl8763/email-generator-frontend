import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Copy, Sparkles, Send, RefreshCw } from 'lucide-react'; // Optional: install lucide-react for icons

function Email() {
    const [email, setEmail] = useState("");
    const [loading, setloading] = useState(false);
    const [data, setdata] = useState({
        purpose: "",
        recipient_type: "",
        tone: "Professional",
        message: "",
        sender_name: ""
    });

    const handleChange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    };

    const generate = async () => {
        if (!data.message || !data.purpose) return alert("Please fill in the core details.");
        setloading(true);
        try {
            const res = await axios.post("https://email-generation-backend-2.onrender.com/email", data);
            setEmail(res.data.email);
        } catch (err) {
            alert("Error generate email");
        }
        setloading(false);
    };

    const copyToClipboard = () => {
        if (email) {
            navigator.clipboard.writeText(email);
            alert("Copied to clipboard!");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-900">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
                
                {/* Left Side: Inputs */}
                <div className="p-8 border-r border-slate-100">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 bg-indigo-600 rounded-lg">
                            <Sparkles className="text-white w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight">Email AI</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-semibold ml-1">Purpose</label>
                            <input name="purpose" placeholder="e.g. Job Application" onChange={handleChange} 
                                className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-semibold ml-1">To Whom?</label>
                                <input name="recipient_type" placeholder="e.g. Hiring Manager" onChange={handleChange} 
                                    className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="text-sm font-semibold ml-1">Tone</label>
                                <select name="tone" onChange={handleChange} 
                                    className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                                    <option value="Professional">Professional</option>
                                    <option value="Friendly">Friendly</option>
                                    <option value="Urgent">Urgent</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-semibold ml-1">Core Message</label>
                            <textarea name="message" placeholder="What points should be covered?" rows="4" onChange={handleChange} 
                                className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none" />
                        </div>

                        <div>
                            <label className="text-sm font-semibold ml-1">Your Name</label>
                            <input name="sender_name" placeholder="Signature name" onChange={handleChange} 
                                className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>

                        <button 
                            onClick={generate}
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-200 disabled:opacity-70"
                        >
                            {loading ? <RefreshCw className="animate-spin" /> : <Send size={18} />}
                            {loading ? "Drafting..." : "Generate Draft"}
                        </button>
                    </div>
                </div>

                {/* Right Side: Output */}
                <div className="p-8 bg-slate-50/50 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-500 uppercase text-xs tracking-widest">Result</h3>
                        {email && (
                            <button onClick={copyToClipboard} className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-sm font-medium">
                                <Copy size={16} /> Copy
                            </button>
                        )}
                    </div>

                    <div className="flex-grow bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-y-auto max-h-[400px] md:max-h-full">
                        {email ? (
                            <p className="whitespace-pre-line text-slate-700 leading-relaxed">{email}</p>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
                                <div className="mb-4 p-4 bg-slate-100 rounded-full italic font-serif text-2xl">“</div>
                                <p className="text-sm px-8">Fill in the details and click generate to see your AI-crafted email here.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Email;