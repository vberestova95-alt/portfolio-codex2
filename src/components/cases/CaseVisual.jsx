import React from 'react';

function CaseImage({ image, mobileImage, alt, className = '' }) {
  return (
    <picture>
      {mobileImage ? <source media="(max-width: 1024px)" srcSet={mobileImage} /> : null}
      <img className={className} src={image} alt={alt} />
    </picture>
  );
}

function CaseLinkWrapper({ className, href, ariaLabel, isClickable, children }) {
  if (!isClickable) {
    return <div className={className}>{children}</div>;
  }

  return (
    <a className={`${className} case-visual-link`} href={href} aria-label={ariaLabel}>
      {children}
    </a>
  );
}

export function CaseVisual({ caseItem, isClickable = true }) {
  const isInteractive = isClickable && caseItem.href && caseItem.href !== '#';
  const ariaLabel = isInteractive ? `Открыть кейс ${caseItem.title}` : undefined;

  if (caseItem.variant === 'featured') {
    return (
      <>
        <div
          className="case-backdrop case-backdrop-featured"
          style={{ backgroundImage: `url(${caseItem.backdrop})` }}
        />
        <CaseLinkWrapper
          className="case-visual case-visual-featured"
          href={caseItem.href}
          ariaLabel={ariaLabel}
          isClickable={isInteractive}
        >
          <CaseImage
            image={caseItem.image.src}
            mobileImage={caseItem.mobileImage?.src}
            alt={caseItem.mobileImage?.alt || caseItem.image.alt}
          />
        </CaseLinkWrapper>
      </>
    );
  }

  if (caseItem.variant === 'wide') {
    return (
      <CaseLinkWrapper
        className="case-visual case-visual-news"
        href={caseItem.href}
        ariaLabel={ariaLabel}
        isClickable={isInteractive}
      >
        <CaseImage
          image={caseItem.image.src}
          mobileImage={caseItem.mobileImage?.src}
          alt={caseItem.mobileImage?.alt || caseItem.image.alt}
        />
      </CaseLinkWrapper>
    );
  }

  if (caseItem.variant === 'kokoc') {
    return (
      <>
        <CaseLinkWrapper
          className="case-visual case-visual-kokoc-main"
          href={caseItem.href}
          ariaLabel={ariaLabel}
          isClickable={isInteractive}
        >
          <CaseImage
            image={caseItem.image.src}
            mobileImage={caseItem.mobileImage?.src}
            alt={caseItem.mobileImage?.alt || caseItem.image.alt}
          />
        </CaseLinkWrapper>
        <CaseLinkWrapper
          className="case-visual case-visual-kokoc-side"
          href={caseItem.href}
          ariaLabel={ariaLabel}
          isClickable={isInteractive}
        >
          <img src={caseItem.secondaryImage.src} alt={caseItem.secondaryImage.alt} />
        </CaseLinkWrapper>
      </>
    );
  }

  return (
    <CaseLinkWrapper
      className="case-visual case-visual-iquoto"
      href={caseItem.href}
      ariaLabel={ariaLabel}
      isClickable={isInteractive}
    >
      <CaseImage
        image={caseItem.image.src}
        mobileImage={caseItem.mobileImage?.src}
        alt={caseItem.mobileImage?.alt || caseItem.image.alt}
      />
    </CaseLinkWrapper>
  );
}
