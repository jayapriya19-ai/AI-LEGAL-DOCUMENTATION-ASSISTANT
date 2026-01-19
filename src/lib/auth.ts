// Local authentication system for Bolt environment
interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

interface AuthResponse {
  user: User | null;
  error: string | null;
}

class LocalAuth {
  private users: Map<string, User> = new Map();
  private currentUser: User | null = null;
  private listeners: ((user: User | null) => void)[] = [];

  constructor() {
    // Load users from localStorage
    const savedUsers = localStorage.getItem('lexify_users');
    if (savedUsers) {
      const usersArray = JSON.parse(savedUsers);
      usersArray.forEach((user: User) => {
        this.users.set(user.email, user);
      });
    }

    // Load current user from localStorage
    const savedCurrentUser = localStorage.getItem('lexify_current_user');
    if (savedCurrentUser) {
      this.currentUser = JSON.parse(savedCurrentUser);
    }
  }

  private saveUsers() {
    const usersArray = Array.from(this.users.values());
    localStorage.setItem('lexify_users', JSON.stringify(usersArray));
  }

  private saveCurrentUser() {
    if (this.currentUser) {
      localStorage.setItem('lexify_current_user', JSON.stringify(this.currentUser));
    } else {
      localStorage.removeItem('lexify_current_user');
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentUser));
  }

  async signUp(email: string, password: string, fullName: string): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    if (this.users.has(email)) {
      return { user: null, error: 'User already exists with this email' };
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { user: null, error: 'Please enter a valid email address' };
    }

    // Validate password
    if (password.length < 6) {
      return { user: null, error: 'Password must be at least 6 characters long' };
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name: fullName,
      created_at: new Date().toISOString()
    };

    this.users.set(email, newUser);
    this.currentUser = newUser;
    this.saveUsers();
    this.saveCurrentUser();
    this.notifyListeners();

    return { user: newUser, error: null };
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = this.users.get(email);
    if (!user) {
      return { user: null, error: 'No account found with this email address' };
    }

    // In a real app, you'd verify the password hash
    // For demo purposes, we'll just check if password is provided
    if (!password) {
      return { user: null, error: 'Password is required' };
    }

    this.currentUser = user;
    this.saveCurrentUser();
    this.notifyListeners();

    return { user, error: null };
  }

  async signInWithGoogle(): Promise<AuthResponse> {
    // Simulate Google OAuth flow with proper user creation
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create a demo Google user with unique email
    const timestamp = Date.now();
    const googleUser: User = {
      id: 'google_' + timestamp.toString(),
      email: `user${timestamp}@gmail.com`,
      name: 'Google User',
      created_at: new Date().toISOString()
    };

    // Check if user already exists, if not create new one
    if (!this.users.has(googleUser.email)) {
      this.users.set(googleUser.email, googleUser);
      this.saveUsers();
    }
    
    this.currentUser = googleUser;
    this.saveCurrentUser();
    this.notifyListeners();

    return { user: googleUser, error: null };
  }

  async signOut(): Promise<void> {
    this.currentUser = null;
    this.saveCurrentUser();
    this.notifyListeners();
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }
}

export const localAuth = new LocalAuth();

// Database simulation for documents and connections
interface DocumentAnalysis {
  id: string;
  user_id: string;
  file_name: string;
  analysis_data: any;
  created_at: string;
}

interface GeneratedDocument {
  id: string;
  user_id: string;
  document_type: string;
  content: string;
  user_insights: string;
  created_at: string;
}

interface ExpertConnection {
  id: string;
  user_id: string;
  expert_id: number;
  message: string;
  status: string;
  created_at: string;
}

class LocalDatabase {
  private getKey(table: string, userId: string): string {
    return `lexify_${table}_${userId}`;
  }

  async saveDocumentAnalysis(userId: string, fileName: string, analysisData: any): Promise<{ error: string | null }> {
    try {
      const key = this.getKey('analyses', userId);
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      
      const newAnalysis: DocumentAnalysis = {
        id: Date.now().toString(),
        user_id: userId,
        file_name: fileName,
        analysis_data: analysisData,
        created_at: new Date().toISOString()
      };

      existing.unshift(newAnalysis);
      localStorage.setItem(key, JSON.stringify(existing));
      
      return { error: null };
    } catch (error) {
      return { error: 'Failed to save analysis' };
    }
  }

  async getDocumentAnalyses(userId: string): Promise<{ data: DocumentAnalysis[] | null; error: string | null }> {
    try {
      const key = this.getKey('analyses', userId);
      const data = JSON.parse(localStorage.getItem(key) || '[]');
      return { data, error: null };
    } catch (error) {
      return { data: null, error: 'Failed to load analyses' };
    }
  }

  async saveGeneratedDocument(userId: string, documentType: string, content: string, insights: string): Promise<{ error: string | null }> {
    try {
      const key = this.getKey('documents', userId);
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      
      const newDocument: GeneratedDocument = {
        id: Date.now().toString(),
        user_id: userId,
        document_type: documentType,
        content,
        user_insights: insights,
        created_at: new Date().toISOString()
      };

      existing.unshift(newDocument);
      localStorage.setItem(key, JSON.stringify(existing));
      
      return { error: null };
    } catch (error) {
      return { error: 'Failed to save document' };
    }
  }

  async getGeneratedDocuments(userId: string): Promise<{ data: GeneratedDocument[] | null; error: string | null }> {
    try {
      const key = this.getKey('documents', userId);
      const data = JSON.parse(localStorage.getItem(key) || '[]');
      return { data, error: null };
    } catch (error) {
      return { data: null, error: 'Failed to load documents' };
    }
  }

  async saveExpertConnection(userId: string, expertId: number, message: string): Promise<{ error: string | null }> {
    try {
      const key = this.getKey('connections', userId);
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      
      const newConnection: ExpertConnection = {
        id: Date.now().toString(),
        user_id: userId,
        expert_id: expertId,
        message,
        status: 'pending',
        created_at: new Date().toISOString()
      };

      existing.unshift(newConnection);
      localStorage.setItem(key, JSON.stringify(existing));
      
      return { error: null };
    } catch (error) {
      return { error: 'Failed to save connection' };
    }
  }

  async getExpertConnections(userId: string): Promise<{ data: ExpertConnection[] | null; error: string | null }> {
    try {
      const key = this.getKey('connections', userId);
      const data = JSON.parse(localStorage.getItem(key) || '[]');
      return { data, error: null };
    } catch (error) {
      return { data: null, error: 'Failed to load connections' };
    }
  }
}

export const localDB = new LocalDatabase();