from pathlib import Path

path = Path('client/src/director/ProjectDetails.jsx')
backup_path = path.with_suffix(path.suffix + '.bak')

menu_block = """    const menuItems = getMenuForRole(userRole);

    const directorData = project?.director || {};
    const userData = {
        name: userRole === 'talent'
            ? (directorData.profile?.fullName || directorData.email?.split('@')[0] || 'Director')
            : (profile?.fullName || (userRole === 'director' ? 'Director' : userRole === 'admin' ? 'Admin' : 'Talent')),
        roleTitle: userRole === 'director' 
            ? `${profile?.companyName || 'Lead Director'} • ${profile?.location || 'India'}`
            : userRole === 'admin'
            ? 'Administrator • TalentConnect'
            : `Director • ${project?.location || directorData.location || 'India'}`,
        avatar: userRole === 'talent'
            ? (directorData.profile?.profilePicture || ('https://ui-avatars.com/api/?name=' + (directorData.email || 'Director')))
            : (profile?.profilePicture === 'no-photo.jpg' 
                ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User') 
                : (profile?.profilePicture || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80"))
    };

"""

raw_text = path.read_text(encoding='utf-8', errors='replace')
if raw_text.startswith('\ufeff'):
    raw_text = raw_text.lstrip('\ufeff')

if menu_block in raw_text:
    print('menu_block already present; skipping')
    raise SystemExit(0)

start = raw_text.find('const menuItems = getMenuForRole(userRole);')
end = raw_text.find('if (loading)', start)
if start == -1 or end == -1:
    raise SystemExit('markers not found')

backup_path.write_text(raw_text, encoding='utf-8')
patched = raw_text[:start] + menu_block + raw_text[end:]
path.write_text(patched, encoding='utf-8')

written = path.read_text(encoding='utf-8', errors='replace')
if menu_block not in written:
    # restore from backup and abort
    path.write_text(backup_path.read_text(encoding='utf-8'), encoding='utf-8')
    raise SystemExit('patch verification failed; original restored')

print('patched')
