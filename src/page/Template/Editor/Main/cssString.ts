export const cssString = `
.form {
    display: flex;
    flex-direction: column;
}

.field {
    border-radius: 2px;
    padding: 4px;
    border: 1px solid transparent;
    margin-bottom: 12px;
    :global {
        .ant-input,
        .ant-picker {
            width: 100%;
        }
    }
}

.footer {
    display: flex;
    justify-content: flex-end;
    :global {
        .ant-btn {
            margin-left: 8px;
        }
    }
}`