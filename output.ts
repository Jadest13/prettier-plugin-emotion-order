// SearchBar
import styled from '@emotion/styled';
import { media, theme } from '@styles/themes';
export const SearchBarLayout = styled.div({
  // Display & Box Model
  padding: '0 60px 80px',
  
  [media[0]]: {
    // Positioning
    position: 'relative',
    
    // Display & Box Model
    padding: '0 20px 40px'
  }
});
const tmp = styled('div')({
  as: 1,
  asd: 1,
  asd33: 1
});
export const SearchBarContainer = styled.div({
  // Positioning
  position: 'relative',
  
  // Display & Box Model
  display: 'flex',
  gap: '12px',
  padding: '12px',
  
  // Typography
  color: theme.colors.primary5,
  fontWeight: '700',
  lineHeight: '1',
  
  // Visual
  background: theme.colors.primary100,
  outline: 'none',
  
  [media[0]]: {
    // Positioning
    position: 'static',
    
    // Display & Box Model
    gap: '12px',
    padding: '12px 12px'
  }
}, (props: {
  active: boolean;
}) => ({
  // Visual
  borderRadius: !props.active ? '12px' : '12px 12px 0 0',
  
  [media[0]]: {
    // Visual
    borderRadius: '8px'
  }
}), ({
  test
}: {
  test: boolean;
}) => test && {
  aa: 2,
  asd: 1,
  dd: 3
}, ({
  test
}: {
  test: boolean;
}) => test ? {
  asd: 1
} : {
  acc: 3,
  ddd: 4
});
export const SearchBarInput = styled.div({
  // Display & Box Model
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '18px',
  
  // Typography
  fontSize: '24px',
  
  // Visual
  background: theme.colors.grayscale100,
  borderRadius: '8px',
  
  ['input']: {
    // Display & Box Model
    boxSizing: 'border-box',
    width: '100%',
    
    // Typography
    color: theme.colors.primary0,
    fontFamily: 'Pretendard',
    
    // Visual
    background: theme.colors.transparent,
    border: 'none',
    outline: 'none',
    
    '::placeholder': {
      // Typography
      color: theme.colors.grayscale50
    }
  },
  
  [media[0]]: {
    // Display & Box Model
    padding: '0 12px',
    
    // Typography
    fontSize: '18px',
    
    // Visual
    borderRadius: '4px',
    
    ['input']: {
      // Display & Box Model
      padding: '12px 0'
    }
  },
  
  ['svg']: {
    // Display & Box Model
    width: 'auto',
    height: '1em',
    
    // Visual
    cursor: 'pointer',
    
    // Misc
    stroke: theme.colors.grayscale30
  }
});
export const SearchBarSelectBox = styled.div({
  // Positioning
  position: 'relative',
  
  // Display & Box Model
  display: 'flex',
  width: '50%',
  
  ['label']: {
    // Display & Box Model
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '18px',
    
    // Typography
    fontSize: '17px',
    
    // Visual
    background: theme.colors.grayscale100,
    borderRadius: '8px',
    cursor: 'pointer',
    
    ['span']: {
      // Animation
      transition: 'all 0.25s ease-in-out'
    },
    
    ['svg']: {
      // Display & Box Model
      width: '1em',
      height: '1em',
      
      // Misc
      fill: theme.colors.grayscale10
    }
  },
  
  [media[0]]: {
    // Display & Box Model
    width: 'auto',
    
    ['label']: {
      // Display & Box Model
      padding: '12px',
      
      // Typography
      fontSize: '15px',
      
      // Visual
      borderRadius: '4px',
      
      ['span']: {
        // Display & Box Model
        overflow: 'hidden',
        width: '75px',
        
        // Typography
        whiteSpace: 'nowrap'
      }
    }
  }
}, (props: {
  focus: boolean;
  minimize?: boolean;
}) => ({
  ...(props.focus && true && {
    ['label']: {
      // Visual
      background: theme.colors.grayscale90,
      borderRadius: '8px 8px 0 0',
      
      [media[0]]: {
        // Visual
        borderRadius: '4px 4px 0 0'
      }
    },
    
    ul: {
      // Display & Box Model
      maxHeight: '150px'
    }
  } && []),
  ...(props.minimize && {
    [media[0]]: {
      ['label']: {
        ['span']: {
          // Display & Box Model
          width: '0px'
        }
      }
    }
  })
}));
export const SearchBarSelectBoxItems = styled.ul({
  // Positioning
  position: 'absolute',
  top: '100%',
  zIndex: '20',
  
  // Display & Box Model
  display: 'flex',
  overflow: 'hidden',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxHeight: '0',
  margin: '0',
  padding: '0',
  
  // Visual
  listStyle: 'none',
  borderRadius: '0 0 8px 8px',
  cursor: 'pointer',
  
  // Animation
  transition: 'max-height .25s ease-in-out',
  
  li: {
    // Display & Box Model
    width: '100%',
    padding: '18px 0',
    
    // Typography
    fontSize: '15px',
    textAlign: 'center',
    
    // Visual
    background: theme.colors.grayscale100,
    borderTop: `2px solid ${theme.colors.grayscale100}`
  },
  
  [media[0]]: {
    // Visual
    borderRadius: '0 0 4px 4px',
    
    li: {
      // Display & Box Model
      padding: '12px 0',
      
      // Typography
      fontSize: '13px'
    }
  }
}, (props: {
  select: number;
}) => ({
  [`li:nth-of-type(${props.select + 1})`]: {
    // Visual
    background: theme.colors.grayscale90
  }
}));

// SearchBarResult

export const SearchBarResultLayoutContainer = styled.div({
  // Positioning
  position: 'absolute',
  top: '100%',
  right: '0',
  left: '0',
  zIndex: '10',
  
  // Display & Box Model
  overflow: 'hidden',
  height: 'auto',
  
  // Visual
  background: theme.colors.primary100,
  
  // Animation
  transition: 'max-height .25s ease-in-out',
  
  [media[0]]: {
    // Display & Box Model
    overflow: 'scroll',
    height: '100vh'
  }
}, (props: {
  height: number;
}) => ({
  // Display & Box Model
  maxHeight: props.height
}));
export const SearchBarResultLayout = styled.div({
  // Display & Box Model
  boxSizing: 'border-box',
  width: '100%',
  padding: '32px',
  
  [media[0]]: {
    // Display & Box Model
    padding: '32px 20px'
  }
});
export const SearchBarResultContainer = styled.div({
  // Display & Box Model
  display: 'flex',
  gap: '24px',
  width: '100%',
  height: '100%',
  
  [media[0]]: {
    // Display & Box Model
    flexDirection: 'column'
  }
});
export const SearchBarResultContent = styled.div({
  // Display & Box Model
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  boxSizing: 'content-box',
  height: '100%',
  
  // Typography
  textTransform: 'uppercase',
  
  [media[0]]: {
    // Display & Box Model
    gap: '12px',
    width: '100%'
  }
}, (props: {
  width: string;
}) => ({
  // Display & Box Model
  width: props.width
}));
export const SearchBarResultSVG = styled.div({
  // Display & Box Model
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  padding: '72px',
  
  [media[0]]: {
    // Display & Box Model
    padding: '32px'
  },
  
  ['svg']: {
    // Display & Box Model
    boxSizing: 'content-box',
    width: 'auto',
    height: '100%',
    minHeight: '260px'
  }
});

// SearchBarResultTitle

export const SearchBarResultTitle = styled.div({
  // Display & Box Model
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  
  // Typography
  fontSize: '24px',
  
  [media[0]]: {
    // Display & Box Model
    gap: '8px',
    
    // Typography
    fontSize: '21px'
  }
});
export const SearchBarResultSubtitle = styled.span({
  // Typography
  color: theme.colors.grayscale30,
  fontWeight: '500',
  fontSize: '15px',
  whiteSpace: 'nowrap',
  
  ['b']: {
    // Typography
    fontWeight: '900'
  },
  
  [media[0]]: {
    // Typography
    fontSize: '13px'
  }
});

// SearchBarResultItem

export const SearchBarResultGridContainer = styled.div({
  // Display & Box Model
  display: 'grid',
  gridAutoFlow: 'column',
  
  // Typography
  columnGap: '32px',
  
  ['> div']: {
    // Display & Box Model
    overflow: 'hidden',
    padding: '8px 0',
    
    // Visual
    borderBottom: `1px solid ${theme.colors.grayscale80}`,
    
    ':last-child, :nth-of-type(5n)': {
      // Visual
      border: 'none'
    }
  },
  
  [media[0]]: {
    // Display & Box Model
    display: 'flex',
    flexDirection: 'column',
    
    ['> div:nth-of-type(5n):not(:last-child)']: {
      // Visual
      borderBottom: `1px solid ${theme.colors.grayscale80}`
    }
  }
}, (props: {
  column: number;
}) => ({
  // Display & Box Model
  gridTemplateRows: `repeat(5, ${props.column}fr)`,
  gridTemplateColumns: `repeat(${props.column}, 1fr)`
}));
export const SearchBarResultItemContainer = styled.div({
  // Display & Box Model
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  padding: '9px 12px 9px 18px',
  
  // Typography
  fontSize: '18px',
  
  // Visual
  borderRadius: '0 32px 32px 0',
  cursor: 'pointer',
  
  [':hover']: {
    // Visual
    background: theme.colors.grayscale100,
    
    ['svg']: {
      // Misc
      stroke: theme.colors.primary5
    }
  },
  
  [media[0]]: {
    // Display & Box Model
    gap: '8px',
    padding: '6px 9px 6px 12px',
    
    // Typography
    fontSize: '15px'
  }
});
export const SearchBarResultItemSVG = styled.div({
  // Display & Box Model
  display: 'flex',
  alignItems: 'center',
  height: 'auto',
  
  // Typography
  lineHeight: 1,
  
  ['> svg']: {
    // Display & Box Model
    width: '.9em',
    height: '.9em',
    
    // Visual
    borderRadius: '24px',
    cursor: 'pointer',
    
    [':hover']: {
      // Visual
      background: theme.colors.grayscale70
    }
  },
  
  [media[0]]: {
    ['> svg']: {
      // Misc
      stroke: theme.colors.primary5
    }
  }
});
export const SearchBarResultItemKeyword = styled.span({
  // Display & Box Model
  padding: '8px 16px',
  
  // Typography
  fontSize: '15px',
  textWrap: 'nowrap',
  
  // Visual
  borderRadius: '24px',
  
  [media[0]]: {
    // Display & Box Model
    padding: '6px 12px',
    
    // Typography
    fontSize: '13px'
  }
}, (props: {
  matched: boolean;
}) => ({
  // Visual
  background: props.matched ? theme.colors.primary50 : theme.colors.grayscale80
}));
export const SearchBarResultItemSubtitle = styled.span({
  // Typography
  color: theme.colors.grayscale40,
  fontSize: '15px',
  whiteSpace: 'nowrap',
  
  [media[0]]: {
    // Typography
    fontSize: '11px'
  }
});
export const SearchBarResultItemTitle = styled.span({
  // Display & Box Model
  overflow: 'hidden',
  marginRight: 'auto',
  
  // Typography
  color: theme.colors.primary0,
  fontSize: '19px',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  
  ['> div']: {
    // Display & Box Model
    display: 'flex',
    gap: '8px',
    paddingTop: '8px',
    
    // Typography
    fontSize: '15px',
    
    ['> div']: {
      // Typography
      color: theme.colors.grayscale60
    }
  },
  
  [media[0]]: {
    // Typography
    fontSize: '15px',
    
    ['> div']: {
      // Display & Box Model
      gap: '6px',
      paddingTop: '6px',
      
      // Typography
      fontSize: '13px'
    }
  },
  
  ['span']: {
    // Typography
    color: theme.colors.primary40
  }
});