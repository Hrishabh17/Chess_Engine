const boardToFen = (board) => {
    const fenRows = [];
    for (let row of board) {
        let fenRow = "";
        let emptySquares = 0;
        for (let piece of row) {
            if (piece) {
                if (emptySquares) {
                    fenRow += emptySquares;
                    emptySquares = 0;
                }
                fenRow += piece;
            } else {
                emptySquares++;
            }
        }
        if (emptySquares) fenRow += emptySquares;
        fenRows.push(fenRow);
    }
    return fenRows.join("/");
}

const fenToBoard = (fen) => {
    const rows = fen.split("/");
    const board = [];
    for (let row of rows) {
        const boardRow = [];
        for (let piece of row) {
            if (isNaN(piece)) {
                boardRow.push(piece);
            } else {
                for (let i = 0; i < parseInt(piece); i++) {
                    boardRow.push(null);
                }
            }
        }
        board.push(boardRow);
    }
    return board;
}

const reverseFen = (fen) => {
    const fenArray = fen.split("/");
    const reversedFen = fenArray.reverse().join("/");
    return reversedFen;
}

const getPieceAtSquare = (board, square_id, numbers, letters) => {
    const row = numbers.indexOf(parseInt(square_id[1]));
    const col = letters.indexOf(square_id[0]);
    return board[row][col];
}

const isSlidingPiece = (piece) => {
    return piece.toLowerCase() === "r" || piece.toLowerCase() === "b" || piece.toLowerCase() === "q";
}

const getPieceColor = (piece) => {
    return piece === piece.toUpperCase() ? "white" : "black";
}

const generateSlidingPieceMoves = (board, piece, color, fromSquare, numbers, letters) => {

    const moves = []
    const row = numbers.indexOf(parseInt(fromSquare[1]));
    const col = letters.indexOf(fromSquare[0]);

    if(piece.toLowerCase() === 'r' || piece.toLowerCase() === 'q'){
        // up
        for(let i = row - 1; i >= 0; i--){
            if(board[i][col] === null){
                moves.push(letters[col] + numbers[i]);
            }
            else{
                if(getPieceColor(board[i][col]) !== color){
                    moves.push(letters[col] + numbers[i]);
                }
                break;
            }
        }

        // down
        for(let i = row + 1; i < 8; i++){
            if(board[i][col] === null){
                moves.push(letters[col] + numbers[i]);
            }
            else{
                if(getPieceColor(board[i][col]) !== color){
                    moves.push(letters[col] + numbers[i]);
                }
                break;
            }
        }

        // left
        for(let i = col - 1; i >= 0; i--){
            if(board[row][i] === null){
                moves.push(letters[i] + numbers[row]);
            }
            else{
                if(getPieceColor(board[row][i]) !== color){
                    moves.push(letters[i] + numbers[row]);
                }
                break;
            }
        }

        // right
        for(let i = col + 1; i < 8; i++){
            if(board[row][i] === null){
                moves.push(letters[i] + numbers[row]);
            }
            else{
                if(getPieceColor(board[row][i]) !== color){
                    moves.push(letters[i] + numbers[row]);
                }
                break;
            }
        }
    }

    if(piece.toLowerCase() === 'b' || piece.toLowerCase() === 'q'){
        // up-left
        for(let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--){
            if(board[i][j] === null){
                moves.push(letters[j] + numbers[i]);
            }
            else{
                if(getPieceColor(board[i][j]) !== color){
                    moves.push(letters[j] + numbers[i]);
                }
                break;
            }
        }

        // up-right
        for(let i = row - 1, j = col + 1; i >= 0 && j < 8; i--, j++){
            if(board[i][j] === null){
                moves.push(letters[j] + numbers[i]);
            }
            else{
                if(getPieceColor(board[i][j]) !== color){
                    moves.push(letters[j] + numbers[i]);
                }
                break;
            }
        }

        // down-left
        for(let i = row + 1, j = col - 1; i < 8 && j >= 0; i++, j--){
            if(board[i][j] === null){
                moves.push(letters[j] + numbers[i]);
            }
            else{
                if(getPieceColor(board[i][j]) !== color){
                    moves.push(letters[j] + numbers[i]);
                }
                break;
            }
        }

        // down-right
        for(let i = row + 1, j = col + 1; i < 8 && j < 8; i++, j++){
            if(board[i][j] === null){
                moves.push(letters[j] + numbers[i]);
            }
            else{
                if(getPieceColor(board[i][j]) !== color){
                    moves.push(letters[j] + numbers[i]);
                }
                break;
            }
        }
    }

    return moves;
}

const generatePawnMoves = (board, fromSquare, numbers, letters) => {
    const moves = []
    const row = numbers.indexOf(parseInt(fromSquare[1]));
    const col = letters.indexOf(fromSquare[0]);
    const color = getPieceColor(board[row][col]);

    if(board[row][col] === 'P' || board[row][col] === 'p'){
        // up
        if(row - 1 >= 0 && board[row - 1][col] === null){
            moves.push(letters[col] + numbers[row - 1]);

            // check if it's the pawn's first move and allow it to move two places forward
            if (row === 6 && board[row - 2][col] === null) {
                moves.push(letters[col] + numbers[row - 2]);
            }
        }

        // up-left
        if(row - 1 >= 0 && col - 1 >= 0 && board[row - 1][col - 1] !== null && getPieceColor(board[row - 1][col - 1]) !== color){
            moves.push(letters[col - 1] + numbers[row - 1]);
        }

        // up-right
        if(row - 1 >= 0 && col + 1 < 8 && board[row - 1][col + 1] !== null && getPieceColor(board[row - 1][col + 1]) !== color){
            moves.push(letters[col + 1] + numbers[row - 1]);
        }
    }
    return moves;
}

const generatePawnExtraMoves = (board, fromSquare, numbers, letters) => {
    const moves = []
    const row = numbers.indexOf(parseInt(fromSquare[1]));
    const col = letters.indexOf(fromSquare[0]);

    if(board[row][col] === 'P' || board[row][col] === 'p'){
        //down 
        if(row + 1 < 8 && board[row + 1][col] === null){
            moves.push(letters[col] + numbers[row + 1]);

            // check if it's the pawn's first move and allow it to move two places forward
            if (row === 1 && board[row + 2][col] === null) {
                moves.push(letters[col] + numbers[row + 2]);
            }
        }

        // down-left
        if(row + 1 < 8 && col - 1 >= 0 && board[row + 1][col - 1] !== null && getPieceColor(board[row + 1][col - 1]) !== 'black'){
            moves.push(letters[col - 1] + numbers[row + 1]);
        }

        // down-right
        if(row + 1 < 8 && col + 1 < 8 && board[row + 1][col + 1] !== null && getPieceColor(board[row + 1][col + 1]) !== 'black'){
            moves.push(letters[col + 1] + numbers[row + 1]);
        }

        // en passant
        if(row === 3){
            if(col - 1 >= 0 && board[row][col - 1] === 'p' && board[row][col - 1] === 'P'){
                moves.push(letters[col - 1] + numbers[row + 1]);
            }
            if(col + 1 < 8 && board[row][col + 1] === 'p' && board[row][col + 1] === 'P'){
                moves.push(letters[col + 1] + numbers[row + 1]);
            }
        }
    }
    return moves;
}

const generateKnightMoves = (board, fromSquare, numbers, letters) => {
    const moves = []
    const row = numbers.indexOf(parseInt(fromSquare[1]));
    const col = letters.indexOf(fromSquare[0]);

    const directions = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
    ];

    for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;

        if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) {
            continue;
        }

        const piece = board[newRow][newCol];
        if (piece === null || getPieceColor(piece) !== getPieceColor(board[row][col])) {
            moves.push(letters[newCol] + numbers[newRow]);
        }
    }

    return moves;
}

const generateKingMoves = (board, fromSquare, numbers, letters) => {
    const moves = [];
    const row = numbers.indexOf(parseInt(fromSquare[1]));
    const col = letters.indexOf(fromSquare[0]);

    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1, -1], [-1, 1], [1, -1], [1, 1]
    ];

    for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;

        if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) {
            continue;
        }

        const piece = board[newRow][newCol];
        if (piece === null || getPieceColor(piece) !== getPieceColor(board[row][col])) {
            moves.push(letters[newCol] + numbers[newRow]);
        }
    }

    // Check if castling is allowed
    const castleMoves = castleMovesAllowed(board, fromSquare, numbers, letters);
    moves.push(...castleMoves);

    return moves;
}

const generateLegalMoves = (board, fromSquare, numbers, letters, kingPosition, isWhiteTurn) => {

    const piece = getPieceAtSquare(board, fromSquare, numbers, letters);
    const color = getPieceColor(piece);

    if(isSlidingPiece(piece)){
        return generateSlidingPieceMoves(board, piece, color, fromSquare, numbers, letters);
    }
    else if(piece.toLowerCase() === 'p'){
        return generatePawnMoves(board, fromSquare, numbers, letters);
    }
    else if(piece.toLowerCase() === 'n'){
        return generateKnightMoves(board, fromSquare, numbers, letters);
    }
    else if(piece.toLowerCase() === 'k'){
        if(isCheck(board, numbers, letters, kingPosition, isWhiteTurn)){
            console.log('king is in check')
            // return [];
        } 
        else{

            
            console.log('king is not in check')
        }
        return generateKingMoves(board, fromSquare, numbers, letters);
    }
}

const castleMovesAllowed = (board, fromSquare, numbers, letters) => {
    const piece = getPieceAtSquare(board, fromSquare, numbers, letters);
    const color = getPieceColor(piece);
    const castlingMoves = [];

    //To do

    return castlingMoves;
}


const isCheck = (board, numbers, letters, kingPos, isWhiteTurn) => {
    if(kingPos !== undefined){
        const kingPosition = kingPos[isWhiteTurn ? "white" : "black"];
        
        const kingRow = numbers.indexOf(parseInt(kingPosition[1]));
        const kingCol = letters.indexOf(kingPosition[0]);

        // Check if any opponent piece can attack the king
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece !== null && getPieceColor(piece) !== getPieceColor(board[kingRow][kingCol])) {
                    const moves = generateLegalMoves(board, letters[col] + numbers[row], numbers, letters);
                    if (moves?.includes(kingPosition)) {
                        return true;
                    }
                    if(piece.toLowerCase() === 'p' && getPieceColor(piece) !== getPieceColor(board[kingRow][kingCol])){
                        const pawnMoves = generatePawnExtraMoves(board, letters[col] + numbers[row], numbers, letters);
                        if(pawnMoves?.includes(kingPosition)){
                            return true;
                        }
                    }
                }
            }
        } 
        return false;
    }
}

export { boardToFen, fenToBoard, generateLegalMoves, getPieceColor, reverseFen };