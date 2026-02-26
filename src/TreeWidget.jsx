import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { Tree } from "react-arborist";
import "./TreeWidget.css";

/* ── parse JSON string datasource and auto-assign IDs ─────────────── */

let _idCounter = 0;

function assignIds(node, prefix) {
  const id = prefix || String(++_idCounter);
  const result = { ...node, id };
  if (node.children && node.children.length > 0) {
    result.children = node.children.map((child, i) =>
      assignIds(child, `${id}-${i + 1}`),
    );
  }
  return result;
}

function parseDataSource(jsonString) {
  _idCounter = 0;
  const parsed = JSON.parse(jsonString);
  const nodes = Array.isArray(parsed) ? parsed : [parsed];
  return nodes.map((n, i) => assignIds(n, String(i + 1)));
}

/* ── status → CSS class mapping ───────────────────────────────────── */

const STATUS_CLASS = {
  "In Progress": "status-progress",
  Completed: "status-completed",
  "Under Review": "status-review",
  Cancelled: "status-cancelled",
};

/* ── highlight matching text ──────────────────────────────────────── */

function Highlight({ text, term }) {
  if (!term) return text;
  const idx = text.toLowerCase().indexOf(term.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="hl">{text.slice(idx, idx + term.length)}</mark>
      {text.slice(idx + term.length)}
    </>
  );
}

/* ── node component ───────────────────────────────────────────────── */

function Node({ node, style, dragHandle, tree }) {
  const { name, status, creator, date } = node.data;
  const isLeaf = !node.children || node.children.length === 0;
  const term = tree.searchTerm;

  return (
    <div
      style={style}
      ref={dragHandle}
      className={`tree-node${node.isSelected ? " selected" : ""}`}
      onClick={() => node.toggle()}
    >
      <span className={`chevron${isLeaf ? " leaf" : ""}${node.isOpen ? " open" : ""}`}>
        {!isLeaf && (
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path
              d="M3 1L7 5L3 9"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>

      <div className="node-body">
        <span className="node-id"><Highlight text={name} term={term} /></span>
        {status && (
          <span className={`node-status ${STATUS_CLASS[status] || ""}`}>
            <Highlight text={status} term={term} />
          </span>
        )}
        {(creator || date) && (
          <span className="node-meta">
            {creator && <Highlight text={creator} term={term} />}
            {creator && date && <> &middot; </>}
            {date && date}
          </span>
        )}
      </div>
    </div>
  );
}

/* ── main widget ──────────────────────────────────────────────────── */

function TreeWidget({ dataSource }) {
  const [data] = useState(() => parseDataSource(dataSource));
  const [search, setSearch] = useState("");
  const treeRef = useRef(null);
  const wrapperRef = useRef(null);
  const [treeWidth, setTreeWidth] = useState(760);

  /* responsive width via ResizeObserver */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) setTreeWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* custom match across all fields */
  const searchMatch = useCallback((node, term) => {
    if (!term) return false;
    const t = term.toLowerCase();
    const d = node.data;
    return (
      d.name?.toLowerCase().includes(t) ||
      d.status?.toLowerCase().includes(t) ||
      d.creator?.toLowerCase().includes(t) ||
      d.date?.toLowerCase().includes(t)
    );
  }, []);

  /* count matches for indicator */
  const matchCount = useMemo(() => {
    if (!search) return null;
    const t = search.toLowerCase();
    let count = 0;
    const walk = (nodes) => {
      for (const n of nodes) {
        if (
          n.name?.toLowerCase().includes(t) ||
          n.status?.toLowerCase().includes(t) ||
          n.creator?.toLowerCase().includes(t) ||
          n.date?.toLowerCase().includes(t)
        ) count++;
        if (n.children) walk(n.children);
      }
    };
    walk(data);
    return count;
  }, [data, search]);

  return (
    <div className="tw">
      <header className="tw-header">
        <h1 className="tw-title">IMS Thread Viewer</h1>
        <p className="tw-subtitle">Browse and search thread records</p>
      </header>

      <div className="tw-card">
        {/* ── toolbar ─────────────────────────────────────── */}
        <div className="tw-toolbar">
          <div className="search-box">
            <svg className="search-icon" width="15" height="15" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10.5 10.5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search by ID, status, creator..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch("")} aria-label="Clear search">
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>

          <div className="tw-toolbar-right">
            {search && matchCount !== null && (
              <span className="match-count">
                {matchCount} result{matchCount !== 1 ? "s" : ""}
              </span>
            )}
            <div className="tw-actions">
              <button
                onClick={() => treeRef.current?.openAll()}
                className="action-btn"
                title="Expand all"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 5.5L7 9.5L11 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => treeRef.current?.closeAll()}
                className="action-btn"
                title="Collapse all"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 8.5L7 4.5L11 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── tree ────────────────────────────────────────── */}
        <div className="tw-body" ref={wrapperRef}>
          <Tree
            ref={treeRef}
            data={data}
            openByDefault={false}
            width={treeWidth}
            height={520}
            indent={20}
            rowHeight={36}
            overscanCount={5}
            paddingTop={4}
            paddingBottom={4}
            searchTerm={search}
            searchMatch={searchMatch}
          >
            {Node}
          </Tree>
        </div>
      </div>
    </div>
  );
}

export default TreeWidget;
