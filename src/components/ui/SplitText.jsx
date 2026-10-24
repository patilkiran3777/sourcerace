import { Fragment } from 'react';

/**
 * Accessible word splitter for GSAP masked reveals (no paid SplitText plugin).
 * Screen readers get the plain sentence via aria-label; the visual spans are hidden from them.
 * `lines` is an array of word arrays (exact Figma line breaks) or a plain string.
 * `accentFrom` (word index across all lines) colours that word and every word after it
 * in the brand green — the two-tone heading style.
 */
export default function SplitText({ as: Tag = 'h2', text, lines, className = '', wordClass, renderWord, accentFrom, ...rest }) {
  const rows = lines || [text.split(' ')];
  const label = rows.map((r) => r.join(' ')).join(' ');
  let n = 0;
  return (
    <Tag className={className} aria-label={label} data-split="" {...rest}>
      {rows.map((words, li) => (
        <Fragment key={li}>
        {li > 0 ? ' ' : null}
        <span className={lines ? 'split-line' : undefined} aria-hidden="true">
          {words.map((w, wi) => (
            <Fragment key={wi}>
              <span className={accentFrom != null && n++ >= accentFrom ? 'split-word split-accent' : 'split-word'}>
                <span className={wordClass}>{renderWord ? renderWord(w, li, wi) : w}</span>
              </span>
              {wi < words.length - 1 ? ' ' : ''}
            </Fragment>
          ))}
        </span>
        </Fragment>
      ))}
    </Tag>
  );
}
