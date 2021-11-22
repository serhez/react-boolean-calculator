import styles from "styles/App.module.css";
import VariableList from "components/VariableList";
import OperationBuilder from "components/OperationBuilder";
import ResultManager from "components/ResultManager";

export default function App() {
    return (
        <div>
            <h1 className={styles["app-title"]}>Boolean Calculator</h1>
            <h2 className={styles["section-title"]}>Variables</h2>
            <VariableList />
            <h2 className={styles["section-title"]}>Operation</h2>
            <OperationBuilder
                parentId={undefined}
                mustBeBool={false}
                optional={false}
            />
            <h2 className={styles["section-title"]}>Result</h2>
            <ResultManager />
        </div>
    );
}
