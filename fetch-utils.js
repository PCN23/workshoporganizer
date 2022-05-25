const SUPABASE_URL = 'https://rtlscqxivjinblfrlgls.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0bHNjcXhpdmppbmJsZnJsZ2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTIzMDU0MTMsImV4cCI6MTk2Nzg4MTQxM30.00XIP2vqbUttvWfraYlPerWhL6U91pxWMD114J1FM8I';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./other-page');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

export async function getClasses() {
    const response = await client.from('class').select('*, participants(*)');
    return checkError(response);
}

export async function createParticipant(participant) {
    const response = await client.from('participants').insert(participant);
    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
    return checkError(response);
}

export async function deleteParticipant(id){
    const response = await client.from('participants').delete().match({ id: id });
    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
    return checkError(response);
}



function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
