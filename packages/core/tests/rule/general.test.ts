import setupTest from "../setup-test";

describe("rule -> general", () => {
  it("removes the rulecontainer if the related store has unmounted", () => {
    const c = setupTest();

    const store = c.createStore({ name: "my-name" });
    store.addRule({ id: "rule-id", consequence: () => {}, target: "" });

    const container = c.managers.rule.db.get("rule-idmy-name");
    expect(container?.id).toBe("rule-id");
    
    c.destroyFnRef.current();

    expect(c.managers.rule.db.size).toBe(0);
  });

  it("removes a rule if the related storecontainer is destroyed", () => {
    const c = setupTest();

    const store = c.createStore({ name: "my-name" });
    store.addRule({ id: "rule-id", consequence: () => {}, target: "" });

    const container = c.managers.rule.db.get("rule-idmy-name");
    expect(container?.id).toBe("rule-id");

    expect(c.managers.rule.db.has("rule-idmy-name"));

    c.destroyFnRef.current();

    expect(c.managers.rule.db.has("rule-idmy-name")).toBeFalsy();
  });
});
