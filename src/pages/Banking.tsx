import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";
import { GrHomeRounded } from "react-icons/gr";
import { FaUserPlus } from "react-icons/fa";
import { TbReceipt2 } from "react-icons/tb";
import { IoSettingsSharp } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { PiHandWavingFill } from "react-icons/pi";
import { PiBellSimpleRingingFill } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";

import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useTransferContext } from "../context/TransferContext";
import { getShowBank } from "../firebase/apiFirebase";

import { getGroupedTransactions } from "../services/transactions";
import Logo from "../components/Logo";

const BankingContainer = styled.div`
  display: grid;
  grid-template-columns: 22rem 1fr;
  position: relative;
  height: 100vh;

  @media (max-width: 37.5em) {
    /* grid-template-columns: 16rem 1fr; */
    position: relative;
    grid-template-columns: 1fr;
  }

  img {
    cursor: pointer;
  }
`;

const Sidebar = styled.div<SidebarProps>`
  padding: 2rem;

  @media (max-width: 37.5em) {
    position: absolute;
    background-color: white;
    height: 100%;
    transition: all 0.3s ease-out;
    transform: ${(props) =>
      props.showMobileNav ? "translateX(-100%)" : "translateX(0)"};
    /* transform: ${(props) =>
      props.showMobileNav ? "translateX(0)" : "translateX(-100%)"}; */
  }
`;

const Main = styled.div`
  background-color: #faf5f5;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const OutletContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  font-family: "DM Sans", sans-serif;
`;

const Header = styled.div`
  font-family: "Roboto", sans-serif;
  padding: 4rem 6rem;
  display: flex;
  justify-content: space-between;

  @media (max-width: 37.5em) {
    padding: 3rem 2rem;
    gap: 2rem;
  }

  svg {
    font-size: 2rem;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 37.5em) {
    gap: 0.5rem;
  }
`;

const NameAbbr = styled.div`
  height: 4rem;
  width: 4rem;
  /* background-color: #c41230; */
  background-color: #e31837;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: white;
  font-size: 1.6rem;
  letter-spacing: 3px;

  @media (max-width: 37.5em) {
    height: 3rem;
    width: 3rem;
    font-size: 1.3rem;
  }
`;

const NameEmailContainer = styled.div`
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 37.5em) {
    gap: 0.3rem;
  }

  div:first-child {
    font-weight: bolder;
    letter-spacing: 1px;
  }

  div:last-child {
    color: gray;
    font-weight: bolder;
    font-size: 1.2rem;
  }
`;

const Hello = styled.div`
  font-size: 2rem;
  color: gray;
  display: flex;
  gap: 0.7rem;
  align-items: center;

  @media (max-width: 37.5em) {
    gap: 2px;
  }

  span {
    font-weight: bolder;
    color: #252525;
    letter-spacing: 0.2rem;
  }
`;

const BankingNav = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  margin-top: 3rem;
  font-size: 1.5rem;
  /* border: 1px solid red; */

  svg {
    fill: gray;
    stroke: gray;
    /* stroke: black; */
    font-size: 3rem;
  }

  & > * {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: gray;
  font-weight: bold;

  &.active {
    color: #e31837;

    svg {
      fill: #e31837;
      stroke: #e31837;
    }
  }
`;

const TransactionsIcon = styled(TbReceipt2)`
  stroke: #4e4e4e !important;

  @media (max-width: 37.5em) {
    margin-left: -4px;
  }

  ${StyledLink}.active & {
    stroke: #b80c26 !important;
  }
`;

const LogoutBtn = styled.div`
  color: gray;
  font-weight: bolder;
  cursor: pointer;

  svg {
    fill: #f3526a;
  }
`;

const TimerDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 2rem;
  font-family: "Roboto", sans-serif;

  h4 {
    font-size: 1rem;
    color: #333; /* Neutral dark gray */
    margin: 0;
  }

  p {
    font-size: 1rem;
    color: #e31837; /* Bright red for urgency */
    margin: 0;
    font-weight: bolder;
    margin-bottom: 5px;
  }
`;

const LogoContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  cursor: pointer;

  div {
    font-size: 1.6rem;
  }

  img {
    width: 3rem;
    height: auto;

    @media (max-width: 37.5em) {
      width: 2rem;
    }
  }
`;

const MobileNav = styled.div`
  display: none;
  margin: 0 2rem;
  cursor: pointer;

  svg {
    font-size: 3rem;
  }

  @media (max-width: 37.5em) {
    display: block;
  }
`;

interface SidebarProps {
  showMobileNav: boolean;
}

export default function Banking() {
  const {
    setTransactionMessages,
    reloadTransactionMsgFlag,
    showBank,
    setShowBank,
  } = useTransferContext();
  const navigate = useNavigate();
  const { logout, startTimer, timeLeft } = useAuth();
  const [showMobileNav, setShowMobileNav] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setShowMobileNav(true); // Close sidebar
      }
    }

    if (!showMobileNav) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showMobileNav]);

  useEffect(
    function () {
      async function getData() {
        const data = await getGroupedTransactions();
        setTransactionMessages(data);
      }

      getData();
    },
    [reloadTransactionMsgFlag]
  );

  useEffect(() => {
    async function getshowbank() {
      const showBank = await getShowBank();
      setShowBank(showBank!);
    }

    getshowbank();
  }, [showBank, setShowBank]);

  useEffect(() => {
    startTimer();
  }, []);

  if (!showBank) {
    return (
      <Navigate to="/international-transaction-violation" replace={false} />
    );
  }

  return (
    <BankingContainer>
      <Sidebar ref={sidebarRef} showMobileNav={showMobileNav}>
        <div>
          <LogoContainer onClick={() => navigate("/")}>
            <Logo />
          </LogoContainer>
        </div>

        <BankingNav>
          <StyledLink to="/banking" end>
            <GrHomeRounded /> Home
          </StyledLink>
          <StyledLink to="/banking/beneficiaries">
            <FaUserPlus /> Beneficiaries
          </StyledLink>
          <StyledLink to="/banking/transactions">
            <TransactionsIcon /> Transactions
          </StyledLink>
          <StyledLink to="/banking/settings">
            <IoSettingsSharp /> Profile Settings
          </StyledLink>
          <LogoutBtn onClick={() => logout()}>
            <IoLogOut /> Logout
          </LogoutBtn>
        </BankingNav>
      </Sidebar>
      <Main>
        <Header>
          <Hello>
            Hello, <span>Sergey</span>
            <PiHandWavingFill style={{ fill: "#e31837", fontSize: "3rem" }} />
          </Hello>

          <Profile>
            <PiBellSimpleRingingFill />

            <NameAbbr>SK</NameAbbr>
            <NameEmailContainer>
              <div>Sergey Kosenko</div>
              <div>mr.thankyouuu@gmail.com</div>
            </NameEmailContainer>

            <MobileNav
              onClick={(e) => {
                e.stopPropagation();
                setShowMobileNav((val) => !val);
              }}
            >
              {showMobileNav && <RxHamburgerMenu />}
              {!showMobileNav && <RxCross2 />}
            </MobileNav>
          </Profile>
        </Header>
        <OutletContainer>
          <Outlet />
        </OutletContainer>
        <TimerDisplay>
          <div>
            <h4>
              For your security, you will be logged out after 8 minutes of
              inactivity.
            </h4>
            <p>
              Time left: {Math.floor(timeLeft / 60)}:
              {`0${timeLeft % 60}`.slice(-2)}
            </p>
          </div>
        </TimerDisplay>
      </Main>
    </BankingContainer>
  );
}
