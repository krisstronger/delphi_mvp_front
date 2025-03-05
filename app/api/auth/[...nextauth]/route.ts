import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Lógica para verificar las credenciales
        const user = { id: "1", email: "user@example.com", type: "user" }; // Simulación de usuario
        if (
          credentials?.email === "user@example.com" &&
          credentials?.password === "password123"
        ) {
          return user;
        }
        return null; // Credenciales inválidas
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.type = user.type; // Agregar el tipo de usuario al token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.type = token.type; // Agregar el tipo de usuario a la sesión
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login", // Ruta personalizada para el inicio de sesión
  },
  secret: process.env.NEXTAUTH_SECRET, // Clave secreta para firmar tokens
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };