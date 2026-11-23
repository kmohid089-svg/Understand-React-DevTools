import { createContext, useContext, useState } from 'react';

const INITIAL = { balance: 485250, loan: 0, loanMonthly: 0 };

const AccountContext = createContext(null);

function load() {
  try {
    const stored = localStorage.getItem('mb_account');
    return stored ? JSON.parse(stored) : INITIAL;
  } catch {
    return INITIAL;
  }
}

function save(state) {
  localStorage.setItem('mb_account', JSON.stringify(state));
}

export function AccountProvider({ children }) {
  const [account, setAccount] = useState(load);

  function deposit(amount) {
    setAccount((prev) => {
      const next = { ...prev, balance: prev.balance + amount };
      save(next);
      return next;
    });
  }

  function withdraw(amount) {
    let success = false;
    setAccount((prev) => {
      if (amount > prev.balance) return prev;
      success = true;
      const next = { ...prev, balance: prev.balance - amount };
      save(next);
      return next;
    });
    return success;
  }

  function takeLoan(amount, monthlyPayment) {
    setAccount((prev) => {
      const next = {
        ...prev,
        balance: prev.balance + amount,
        loan: prev.loan + amount,
        loanMonthly: monthlyPayment,
      };
      save(next);
      return next;
    });
  }

  function repayLoan(amount) {
    setAccount((prev) => {
      const repay = Math.min(amount, prev.balance);
      const newLoan = Math.max(0, prev.loan - repay);
      const next = {
        ...prev,
        balance: prev.balance - repay,
        loan: newLoan,
        loanMonthly: newLoan === 0 ? 0 : prev.loanMonthly,
      };
      save(next);
      return next;
    });
  }

  function resetAccount() {
    localStorage.removeItem('mb_account');
    setAccount(INITIAL);
  }

  return (
    <AccountContext.Provider value={{ ...account, deposit, withdraw, takeLoan, repayLoan, resetAccount }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  return useContext(AccountContext);
}
