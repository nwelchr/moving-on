const levelMaps = [
  // [     "xxxxxxxxxxxxxxx                                                    ",
//         "x             x                                          ",
//         "x   i         x                                         ",
//         "x             x                               r         ",
//         "x             x                               @          ",
//         "x             x                                         ",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x         1   x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x         a   x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x         2   x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x             x",
//         "x         !   x",
//         "xxxxxxxxxxxxxxx"
//       ],
//       [
//         "                                                                ",
//         "                      ",   
//         "                     ",
//         " x                                x          x",
//         " x                                x          x",
//         " x                                x          x ",
//         " x                                x          x         x",
//         " x                              ! x          x         x",
//         " x                                x          x         x",
//         " x   3                       4    x          x         x",
//         " x                              x x          x         x",
//         " x i                              xxxxxxxxxxxx      r  x",
//         " x                              @                      x",    
//         " xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
//       ],
//        [  "                                                        ",
//           " x                                                     x",   
//           " x                                                     x",
//           " x                                                     x",
//           " x                                                     x",
//           " x                                                     x",
//           " x                       ! @                           x",
//           " x                  xxxxxxxxxxxx                       x",
//           " x                  xxxxxxxxxxxx                       x",
//           " x   5           xxxxxxxxxxxxxxxxxx                    x",
//           " x               xxxxxxxxxxxxxxxxxx                    x",
//           " x i          xxxxxxxxxxxxxxxxxxxxxxxx              r  x",
//           " x            xxxxxxxxxxxxxxxxxxxxxxxx                 x",    
//           " xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
//         ],

//     [ "x                                                                                                      ",
//       "x             x                                          ",
//       "x             x                                                                                  ",
//       "x             x                                                                                    ",
//       "x             x                                                                                  ",
//       "x             x                                                                       xxxxxxxxxxxxxxx              ",
//       "x             x                                                                       x             x           ",
//       "x             x                                                                       x   !   @     x      ",
//       "x             x      xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx              xxxxxxxxxxxxxxxxx             x      ",
//       "x             x      x                                 x              x                             x ",
//       "x             x      x                                 x              x                             x  ",
//       "x             x      x                         7       x              x                             x   ",
//       "x             x      x                                 x              x                   t   t     x   ",
//       "x             x      x       xxxxxxxxxxxxxxxxxxx       x              x ggggg xxxxxxxxxxxxxxxxxxxxxxx     ",
//       "x             x      x ggggg x                 x       x              x ggggg x      ",
//       "x             x      x ggggg x                 x       x              x ggggg x",
//       "x             x      x ggggg x                 x       x              x ggggg x",
//       "x             x      x ggggg x                 x       x              x ggggg x ",
//       "x             xxxxxxxx ggggg x                 x       xxxxxxxxxxxxxxxx ggggg x",
//       "x                      ggggg x                 x                        ggggg x                                       x",
//       "x i   r          6     ggggg x                 x                        ggggg x",
//       "x                            x                 x                        ggggg x",
//       "x                            x                 x                        ggggg x",
//       "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx                 x                        ggggg x",
//       "                                               x                        ggggg x",
//       "                                               x                        ggggg x",
//       "                                               x                        ggggg x",
//       "                                               x                        ggggg x",
//       "                                               x                        ggggg x",
//       "                                               x                        ggggg x",
//       "                                               x                        ggggg x",
//       "                                               x                        ggggg x",
//       "                                               x                        ggggg x",
//       "                                               x                        ggggg x",
//       "                                               x                        ggggg x",
//       "                                               x                        ggggg x",
//       "                                               x                        ggggg x",
//       "                                               x                        ggggg x",
//       "                                               x                        ggggg x",
//       "                                               x                        ggggg x",
//       "                                               x                        ggggg x",
//       "                                               x                              x",
//       "                                               xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
// ],

//  [        "                                                                             ",
//           " x                                                                  x        x",   
//           " x                                                                  x         x",
//           " x   8                                                              x         x",
//           " x                                                                  x        x",
//           " x   i    r                                                         x            x",
//           " x                                                                  x        x",
//           " xxxxxxxxxxxxx           xxx             xxx                    ! @ x                    x",
//           " xxxxxxxxxxxxx                                              xxxxxxxxx                     x",
//           " xxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxx                   x",
//           " xxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxx ",
//           " xxxxxxxxxxxxxwwwwwwwwwwwww9wwwwwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxx x",
//           " xxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxx x",    
//           " xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
//         ],
// [         "x             x                                            ",
//           "x    i    r   x",
//           "x             x",
//           "x             x",
//           "x             x",
//           "x             x",
//           "x             x",
//           "x             x",
//           "x             x",
//           "x             x",
//           "x             x",
//           "x             x",
//           "x             x",
//           "x             x",
//           "x             x",
//           "x             x",
//           "x             x",
//           "x             x",
//           "xp  ppppppppppx",
//           "x             x",
//           "x   0         x",
//           "x             x          #",
//           "x             xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
//           "x                |   v   |   v   |   v  =|   |   v =   x",
//           "x                  v   v    v   v   v  =v   |   v   =  x",
//           "x     !                                            @   x",
//           "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
// ],

//       [  "                                                                                             r  ",
//           " x                                                                                        x  @ x",   
//           " x                                                                                        xxxxxx",
//           " x                                                               x           x            x",
//           " x               x                                x                                       x",
//           " x                              x                          x         x                    x",
//           " x           x                            x                                  x            x",
//           " x                      x                            x                            x       x",
//           " x                                           x                   x                        x",
//           " x               $                  x                                   x                 x",
//           " x                            x                           x                      x        x",
//           " x i                                                                                      x",
//           " x                                                                                    !   x",    
//           " xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
//         ],

//       [  "                                                           r  ",
//           " x                                     x                x  @ x",   
//           " x                                     x                xxxxxx",
//           " x                                     x",
//           " x              xhh ! hhx              x",
//           " x             xhhhh hhhhx     t       x",
//           " x             xhhhhhhhhhx             x",
//           " x             xxhhhhhhhxx             x",
//           " x              xxhhhhhxx              x",
//           " x   %           xxhhhxx    t          x",
//           " x                xxhxx                x",
//           " x i               xxx                 x",
//           " x                                     x",    
//           " x                             t       x",    
//           " xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
//         ],
// [         "                                                                       r      ",
//           " x                                                                  x  @     x",   
//           " x                                                                  xxxxxxxxxx         x",
//           " x   ^                                                              x         x",
//           " x                                                                  x        x",
//           " x   i                                                             x            x",
//           " x                                                                  x        x",
//           " xxxxxxxxxxxxx           xxx             xxx                    !  x                    x",
//           " xxxxxxxxxxxxx                                              xxxxxxxxx                     x",
//           " xxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxx                   x",
//           " xxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxx ",
//           " xxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxx x",
//           " xxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxx x",    
//           " xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
//         ],

// [       "xxxxxxxxxxxxxxxxxx                                                       ",
//         "x                x                                          ",
//         "x      !         x                                         ",
//         "x                x                               r         ",
//         "x                x                               @          ",
//         "x                x                                         ",
//         "x                x",
//         "x                x                                          ",
//         "x                x                                        ",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x   i    &       x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                x",
//         "x                xxxxxxxxxxxxxxxx",
//         "x               *               x",
//         "x                               x",
//         "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
// ],

  //     [   " )                                                      @ ",
  //         "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  //         "x                                         x",
  //         "x                                      !  x",
  //         "x             xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x             x",
  //         "x    i    r   x",
  //         "x (           x",
  //         "xxxxxxxxxxxxxxx"]
    
  // ];
    
    
export default levelMaps;