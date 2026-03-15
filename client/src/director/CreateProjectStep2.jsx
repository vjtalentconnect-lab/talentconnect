import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createProject } from '../services/projectService';

const CreateProjectStep2 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { projectData } = location.state || {};

    const [roles, setRoles] = useState([
        {
            title: '',
            ageMin: '',
            ageMax: '',
            gender: 'Any',
            physicalAttributes: '',
            skills: []
        }
    ]);
    const [skillInput, setSkillInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRoleChange = (index, field, value) => {
        const newRoles = [...roles];
        newRoles[index][field] = value;
        setRoles(newRoles);
    };

    const handleAddSkill = (index, e) => {
        e.preventDefault();
        if (skillInput.trim()) {
            const newRoles = [...roles];
            if (!newRoles[index].skills.includes(skillInput.trim())) {
                newRoles[index].skills.push(skillInput.trim());
            }
            setRoles(newRoles);
            setSkillInput('');
        }
    };

    const handleRemoveSkill = (roleIndex, skillIndex) => {
        const newRoles = [...roles];
        newRoles[roleIndex].skills.splice(skillIndex, 1);
        setRoles(newRoles);
    };

    const addRole = () => {
        setRoles([...roles, { title: '', ageMin: '', ageMax: '', gender: 'Any', physicalAttributes: '', skills: [] }]);
    };

    const removeRole = (index) => {
        if (roles.length > 1) {
            const newRoles = [...roles];
            newRoles.splice(index, 1);
            setRoles(newRoles);
        }
    };

    const handlePublish = async (e) => {
        e.preventDefault();
        
        if (!projectData) {
            alert('Missing project details. Please go back to Step 1.');
            return;
        }

        // Format roles into strings for the schema `requirements: [String]`
        const formattedRequirements = roles.map(r => {
            const titleStr = r.title || 'Untitled Role';
            const ageStr = (r.ageMin && r.ageMax) ? `${r.ageMin}-${r.ageMax} yrs` : (r.ageMin ? `${r.ageMin}+ yrs` : '');
            const basicInfo = [r.gender !== 'Any' ? r.gender : '', ageStr].filter(Boolean).join(', ');
            const infoStr = basicInfo ? ` (${basicInfo})` : '';
            const physStr = r.physicalAttributes ? ` - ${r.physicalAttributes}` : '';
            const skillStr = r.skills.length > 0 ? ` Skills: ${r.skills.join(', ')}` : '';
            
            return `${titleStr}${infoStr}${physStr}.${skillStr}`;
        });

        const finalData = {
            ...projectData,
            requirements: formattedRequirements
        };

        try {
            setLoading(true);
            await createProject(finalData);
            alert('Project published successfully!');
            navigate('/director/my-projects');
        } catch (err) {
            console.error(err);
            alert(err?.response?.data?.message || 'Failed to create project');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="layout-container flex h-full grow flex-col">
                <header className="flex items-center justify-between border-b border-primary/20 px-6 md:px-10 py-4 bg-background-light dark:bg-background-dark sticky top-0 z-50">
                    <div className="flex items-center gap-4">
                        <img src="/TC Logo.png" alt="Logo" className="h-10 w-auto" />
                        <h2 className="text-xl font-bold tracking-tight">Create New Project</h2>
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        <button onClick={() => navigate('/director/my-projects')} className="flex items-center justify-center rounded-full p-2 bg-slate-100 dark:bg-primary/10 text-slate-900 dark:text-primary hover:bg-primary/20 transition-all shadow-sm border border-slate-200 dark:border-primary/20">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </header>

                <main className="flex flex-1 justify-center py-8 px-4 md:px-0">
                    <div className="layout-content-container flex flex-col max-w-[800px] flex-1">
                        <div className="flex flex-col gap-4 mb-8">
                            <div className="flex gap-6 justify-between items-end">
                                <div className="flex flex-col">
                                    <span className="text-primary text-xs font-bold uppercase tracking-wider">Step 2 of 2</span>
                                    <p className="text-slate-900 dark:text-white text-lg font-semibold leading-normal">Casting Requirements</p>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">100% Complete</p>
                            </div>
                            <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: '100%' }}></div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 mb-10">
                            <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">Define Your Talent Needs</h1>
                            <p className="text-slate-600 dark:text-slate-400 text-lg">Specify the roles and unique attributes required for your production to find the perfect match.</p>
                        </div>

                        <div className="flex flex-col gap-10">
                            {roles.map((role, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-primary/20 rounded-xl p-6 md:p-8 relative overflow-hidden">
                                    {roles.length > 1 && (
                                        <div className="absolute top-0 right-0 p-4">
                                            <button onClick={() => removeRole(index)} className="text-slate-400 hover:text-red-500 transition-colors">
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="bg-primary text-white size-8 rounded-lg flex items-center justify-center font-bold">{index + 1}</div>
                                        <h2 className="text-slate-900 dark:text-white text-2xl font-bold">Role {index + 1}</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <label className="flex flex-col gap-2">
                                                <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Role Title</span>
                                                <input
                                                    className="w-full rounded-xl border border-slate-300 dark:border-primary/30 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                                    placeholder="e.g. Lead Protagonist, Extras..."
                                                    type="text"
                                                    value={role.title}
                                                    required
                                                    onChange={(e) => handleRoleChange(index, 'title', e.target.value)}
                                                />
                                            </label>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Age Range</span>
                                            <div className="flex gap-2">
                                                <input value={role.ageMin} onChange={(e) => handleRoleChange(index, 'ageMin', e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-primary/30 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:border-primary outline-none" placeholder="Min" type="number" />
                                                <input value={role.ageMax} onChange={(e) => handleRoleChange(index, 'ageMax', e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-primary/30 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:border-primary outline-none" placeholder="Max" type="number" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Gender</span>
                                            <select value={role.gender} onChange={(e) => handleRoleChange(index, 'gender', e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-primary/30 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:border-primary outline-none appearance-none">
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Non-binary</option>
                                                <option>Any</option>
                                            </select>
                                        </div>
                                        <div className="md:col-span-2 flex flex-col gap-2">
                                            <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Physical Attributes</span>
                                            <textarea
                                                className="w-full rounded-xl border border-slate-300 dark:border-primary/30 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:border-primary outline-none resize-none"
                                                placeholder="Height, build, eye color, specific ethnic look..."
                                                rows="2"
                                                value={role.physicalAttributes}
                                                onChange={(e) => handleRoleChange(index, 'physicalAttributes', e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="md:col-span-2 flex flex-col gap-2">
                                            <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Key Skills Required</span>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {role.skills.map((skill, sIdx) => (
                                                    <span key={sIdx} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
                                                        {skill} <button type="button" onClick={() => handleRemoveSkill(index, sIdx)} className="material-symbols-outlined text-[14px] hover:text-red-500">close</button>
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="relative">
                                                <input 
                                                    className="w-full rounded-xl border border-slate-300 dark:border-primary/30 bg-white dark:bg-slate-800 px-4 py-3 pr-12 text-slate-900 dark:text-white focus:border-primary outline-none" 
                                                    placeholder="Add a skill and press + (e.g. Method Acting)" 
                                                    type="text" 
                                                    value={skillInput}
                                                    onChange={(e) => setSkillInput(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(index, e)}
                                                />
                                                <button type="button" onClick={(e) => handleAddSkill(index, e)} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80">
                                                    <span className="material-symbols-outlined text-2xl">add_circle</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            <div onClick={addRole} className="bg-white/50 dark:bg-slate-900/20 border-2 border-dashed border-slate-300 dark:border-primary/20 rounded-xl p-6 md:p-8 group hover:border-primary/50 transition-all cursor-pointer flex flex-col items-center justify-center py-12">
                                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">person_add</span>
                                </div>
                                <h3 className="text-slate-900 dark:text-white font-bold text-lg">Add Another Role</h3>
                                <p className="text-slate-500 text-sm">Create specific requirements for secondary or supporting talent.</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pb-20 border-t border-slate-200 dark:border-primary/20 pt-8">
                            <button
                                onClick={handleBack}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                                type="button"
                            >
                                <span className="material-symbols-outlined">arrow_back</span>
                                Back to Project Details
                            </button>
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <button 
                                    onClick={handlePublish}
                                    disabled={loading}
                                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 disabled:opacity-50 text-white px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                                >
                                    {loading ? 'Publishing...' : 'Publish Project'}
                                    <span className="material-symbols-outlined">{loading ? 'hourglass_empty' : 'rocket_launch'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CreateProjectStep2;
