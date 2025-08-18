import { useRef } from 'react';

const PersonForm = ({
  onSubmit,
  nameValue,
  onNameChange,
  numberValue,
  onNumberChange,
}) => {
  const numberRef = useRef(null);

  // Mirror server constraints:
  // - name minLength 3
  // - number pattern: NN-NNN… or NNN-NNN… ; total digits >= 8 (server enforces hard)
  const onNumberInput = (e) => {
    const el = numberRef.current;
    if (!el) return;

    const val = e.target.value.trim();
    const basicPatternOk = /^\d{2,3}-\d+$/.test(val);
    const digits = val.replace(/-/g, '');
    const enoughDigits = digits.length >= 8;

    // Custom validity hints (server still does real validation)
    if (!basicPatternOk) {
      el.setCustomValidity('Use formats like 09-123456 or 040-555');
    } else if (!enoughDigits) {
      el.setCustomValidity('Number must contain at least 8 digits in total');
    } else {
      el.setCustomValidity('');
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid-2 form" noValidate>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        value={nameValue}
        onChange={onNameChange}
        minLength={3}
        required
        placeholder="Ada Lovelace"
        autoComplete="off"
      />

      <label htmlFor="number">Number</label>
      <input
        id="number"
        ref={numberRef}
        type="tel"
        value={numberValue}
        onChange={(e) => { onNumberChange(e); onNumberInput(e); }}
        pattern="^\d{2,3}-\d+$"
        inputMode="numeric"
        placeholder="09-123456 or 040-555"
        required
        title="Use NN-NNN... or NNN-NNN...; at least 8 digits total"
        autoComplete="off"
      />

      <div />
      <button type="submit" className="btn">Add</button>
    </form>
  );
};

export default PersonForm;
  