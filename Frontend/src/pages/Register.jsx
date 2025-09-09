import { useState } from "react";
import {signup} from "../utils/http";
import styled, { createGlobalStyle } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { PrimaryButton } from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faGraduationCap,
  faLock,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

const GlobalStyle = createGlobalStyle`
  html, body, #root { height: 100%; margin: 0; padding: 0; }
  body { background:#fafafa; font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial; }
  * { box-sizing: border-box; }
`;

// Styled components
const Section = styled.section`
  height: 100vh;
  display: grid;
  place-content: center;
  padding: 24px;
  overflow: hidden;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const LogoBox = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: #0b0b14;
  color: #fff;
  font-weight: 800;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
`;

const H1 = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 800;
  color: #111827;
`;

const Lead = styled.p`
  margin: 8px 0 0;
  color: #6b7280;
  font-size: 1rem;
`;

const FormWrap = styled.div`
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
`;

const FormTitle = styled.h2`
  margin: 0 0 6px;
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
`;

const FormDesc = styled.p`
  margin: 0 0 18px;
  color: #6b7280;
  font-size: 0.95rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  margin: 14px 0 6px;
`;

const Row2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const InputWrap = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const Icon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.9rem;
  color: #9ca3af;
  pointer-events: none;
`;

const BaseInput = styled.input`
  width: 100%;
  padding: 12px 12px 12px 40px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 0.95rem;
  color: #374151;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: #111827;
    box-shadow: 0 0 0 2px #11182722;
  }
`;

const BaseSelect = styled.select`
  width: 100%;
  padding: 12px 12px 12px 40px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 0.95rem;
  color: ${props => (props.value ? "#374151" : "#9ca3af")};

  &:focus {
    border-color: #111827;
    box-shadow: 0 0 0 2px #11182722;
  }

  option[value=""] {
    color: #9ca3af;
  }
  option {
    color: #374151;
  }
`;

// Main component
export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    yearLevel: "",
    major: "",
    password: "",
    confirm: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await signup(form.fullName, form.email, form.yearLevel, form.major, form.password);
      console.log("Registration successful:", response);
      navigate("/main/home");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
      }
  };

// JSX
  return (
    <>
      <GlobalStyle />
      <Section>
        <Header>
          <LogoBox>
            <img 
              src="/UniCircle_Logo.png" 
              alt="Unicircle logo" 
              style={{ width: "60%", height: "60%", objectFit: "contain" }}
            />
          </LogoBox>
          <H1>Join Unicircle</H1>
          <Lead>Create your student account</Lead>
        </Header>

        <FormWrap>
          <Card style={{ padding: 24, borderRadius: 16 }}>
            <FormTitle>Create Account</FormTitle>
            <FormDesc>
              Fill in your details to create your Unicircle account
            </FormDesc>

            <form onSubmit={onSubmit}>
              <Label htmlFor="fullName">Full Name</Label>
              <InputWrap>
                <Icon>
                  <FontAwesomeIcon icon={faUser} />
                </Icon>
                <BaseInput
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  value={form.fullName}
                  onChange={onChange}
                />
              </InputWrap>

              <Label htmlFor="email">Student Email</Label>
              <InputWrap>
                <Icon>
                  <FontAwesomeIcon icon={faEnvelope} />
                </Icon>
                <BaseInput
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your.email@student.uts.edu.au"
                  value={form.email}
                  onChange={onChange}
                />
              </InputWrap>

              <Row2>
                <div>
                  <Label htmlFor="yearLevel">Year Level</Label>
                  <InputWrap>
                    <Icon>
                      <FontAwesomeIcon icon={faCalendar} />
                    </Icon>
                    <BaseSelect
                      id="yearLevel"
                      name="yearLevel"
                      value={form.yearLevel}
                      onChange={onChange}
                    >
                      <option value="">Select year</option>
                      <option value="Y1">Year 1</option>
                      <option value="Y2">Year 2</option>
                      <option value="Y3">Year 3</option>
                      <option value="Y4_plus">Year 4+</option>
                      <option value="Masters">Masters</option>
                      <option value="PhD">PhD</option>
                    </BaseSelect>
                  </InputWrap>
                </div>

                <div>
                  <Label htmlFor="major">Major</Label>
                  <InputWrap>
                    <Icon>
                      <FontAwesomeIcon icon={faGraduationCap} />
                    </Icon>
                    <BaseInput
                      id="major"
                      name="major"
                      placeholder="Computer Science"
                      value={form.major}
                      onChange={onChange}
                    />
                  </InputWrap>
                </div>
              </Row2>

              <Label htmlFor="password">Password</Label>
              <InputWrap>
                <Icon>
                  <FontAwesomeIcon icon={faLock} />
                </Icon>
                <BaseInput
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={onChange}
                />
              </InputWrap>

              <Label htmlFor="confirm">Confirm Password</Label>
              <InputWrap>
                <Icon>
                  <FontAwesomeIcon icon={faLock} />
                </Icon>
                <BaseInput
                  id="confirm"
                  type="password"
                  name="confirm"
                  placeholder="Confirm your password"
                  value={form.confirm}
                  onChange={onChange}
                />
              </InputWrap>

              <PrimaryButton type="submit">Create Account</PrimaryButton>
            </form>

            <FormDesc style={{ textAlign: "center", marginTop: 12 }}>
              Already have an account?{" "}
              <Link
                to="/"
                style={{
                  fontWeight: 700,
                  textDecoration: "underline",
                  color: "#111827",
                }}
              >
                Sign In
              </Link>
            </FormDesc>
          </Card>
        </FormWrap>
      </Section>
    </>
  );
}
