import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AuthenticateLayout from "@components/Layout/AuthenticateLayout";
import { UserSignUpPayload } from "@interfaces/user.interface";
import { useAuth } from "@contexts/useAuthContext";

const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  firstName: z.string().min(1, "Please provide first name"),
  lastName: z.string().min(1, "Please provide first name"),
});

export default function SignUp() {
  const navigate = useNavigate();
  const { signup, isLoading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (payload: UserSignUpPayload) => {
    await signup(payload, navigate);
  };

  return (
    <AuthenticateLayout>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Sign up
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel htmlFor="firstName" sx={{ marginBottom: "5px" }}>
            First Name
          </FormLabel>
          <TextField
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message as string}
            id="firstName"
            type="firstName"
            placeholder="John"
            autoComplete="firstName"
            required
            fullWidth
            variant="outlined"
            color={errors.firstName ? "error" : "primary"}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="lastName" sx={{ marginBottom: "5px" }}>
            Last Name
          </FormLabel>
          <TextField
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message as string}
            id="lastName"
            type="lastName"
            placeholder="Doe"
            autoComplete="lastName"
            required
            fullWidth
            variant="outlined"
            color={errors.lastName ? "error" : "primary"}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email" sx={{ marginBottom: "5px" }}>
            Email
          </FormLabel>
          <TextField
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message as string}
            id="email"
            type="email"
            placeholder="your@email.com"
            autoComplete="email"
            required
            fullWidth
            variant="outlined"
            color={errors.email ? "error" : "primary"}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password" sx={{ marginBottom: "5px" }}>
            Password
          </FormLabel>
          <TextField
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message as string}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="new-password"
            required
            fullWidth
            variant="outlined"
            color={errors.password ? "error" : "primary"}
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            zIndex: 1,
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="secondary" sx={{ zIndex: 0 }} />
          ) : (
            "Sign up"
          )}
        </Button>
      </Box>
      <Divider>
        <Typography sx={{ color: "text.secondary" }}>or</Typography>
      </Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography sx={{ textAlign: "center" }}>
          Already have an account? <Link to="/signin">Sign in</Link>
        </Typography>
      </Box>
    </AuthenticateLayout>
  );
}
