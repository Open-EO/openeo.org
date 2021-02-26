# (C) 2021, Jonathan Bahlmann, CC-BY-SA
# based on work by Edzer Pebesma, 2019, here: https://gist.github.com/edzer/5f1b0faa3e93073784e01d5a4bb60eca

# wdir, packages, read input ----
setwd()
set.seed(1331)
library(stars)
library(colorspace)
library(scales)
library(raster)

tif = system.file("tif/L7_ETMs.tif", package = "stars")
r = read_stars(tif)

# dims, as_stars ----
nrow = 6
ncol = 7
m = r[[1]][1:nrow,1:ncol,1]
dim(m) = c(x = nrow, y = ncol) # named dim
s = st_as_stars(m)

# make color palettes ----
blues <- sequential_hcl(n = 20, h1 = 211, c1 = 80, l1 = 40, l2 = 100, p1 = 2)
greens <- sequential_hcl(n = 20, h1 = 134, c1 = 80, l1 = 40, l2 = 100, p1 = 2)
reds <- sequential_hcl(n = 20, h1 = 360, c1 = 80, l1 = 40, l2 = 100, p1 = 2)
purples <- sequential_hcl(n = 20, h1 = 299, c1 = 80, l1 = 40, l2 = 100, p1 = 2)
greys <- sequential_hcl(n = 20, h1 = 0, c1 = 0, l1 = 40, l2 = 100, p1 = 2)

# choose raster to make matrices from ----
input <- read_stars("iceland_delta_cutout_2.tif")
input <- input[,,,1:4]
warped <- st_warp(input, crs = st_crs(input), cellsize = 200)
# plot(warped)
# image(warped[,,,1], text_values = TRUE)
t1 <- floor(matrix(runif(42, -30, 150), ncol = 7))
t2 <- floor(matrix(runif(42, -250, 50), ncol = 7))

# make matrices from image ----
b1 <- matrix(warped[,,,1][[1]][1:42], ncol = 7)
b2 <- matrix(warped[,,,1][[1]][1:42], ncol = 7) - t1 
b3 <- matrix(warped[,,,1][[1]][1:42], ncol = 7) - t2
g1 <- matrix(warped[,,,2][[1]][1:42], ncol = 7)
g2 <- matrix(warped[,,,2][[1]][1:42], ncol = 7) - t1
g3 <- matrix(warped[,,,2][[1]][1:42], ncol = 7) - t2
r1 <- matrix(warped[,,,3][[1]][1:42], ncol = 7)
r2 <- matrix(warped[,,,3][[1]][1:42], ncol = 7) - t1
r3 <- matrix(warped[,,,3][[1]][1:42], ncol = 7) - t2
n1 <- matrix(warped[,,,4][[1]][1:42], ncol = 7)
n2 <- matrix(warped[,,,4][[1]][1:42], ncol = 7) - t1
n3 <- matrix(warped[,,,4][[1]][1:42], ncol = 7) - t2

# plot functions ----
plt = function(x, yoffset = 0, add, li = TRUE, pal, print_geom = TRUE) {
  # pal is color palette
  attr(x, "dimensions")[[2]]$offset = attr(x, "dimensions")[[2]]$offset + yoffset 
  l = st_as_sf(x, as_points = FALSE)
  if (li)
    pal = lighten(pal, 0.3 + rnorm(1, 0, 0.1))
  if (! add)
    plot(l, axes = FALSE, breaks = "equal", pal = pal, reset = FALSE, border = grey(.75), key.pos = NULL, main = NULL, xlab = "time")
  else
    plot(l, axes = TRUE, breaks = "equal", pal = pal, add = TRUE, border = grey(.75))
  u = st_union(l)
  # print(u)
  if(print_geom) {
    plot(st_geometry(u), add = TRUE, col = NA, border = 'black', lwd = 2.5)
  } else {
    # not print geometry
  }
}

# time series ----
# x, y, sheer: 2.5, -.5, -1.14 ----
attr(s, "dimensions")[[1]]$delta = 2.5
attr(s, "dimensions")[[2]]$delta = -.5714286
attr(attr(s, "dimensions"), "raster")$affine = c(-1.14, 0.0)

# ts plot function ----
pl = function(s, x, y, add = TRUE, randomize = FALSE, nrM) {
  attr(s, "dimensions")[[1]]$offset = x
  attr(s, "dimensions")[[2]]$offset = y
  # m = r[[1]][y + 1:nrow,x + 1:ncol,1]
  if (randomize)
    m = m[sample(y + 1:nrow),x + 1:ncol]
  # dim(m) = c(x = nrow, y = ncol) # named dim
  # make matrix, since this prints stacks
  m <- eval(parse(text=paste0("n", nrM)))
  s[[1]] = m[,c(7:1)]
  plt(s, 0, TRUE,  pal = purples)
  m <- eval(parse(text=paste0("r", nrM)))
  s[[1]] = m[,c(7:1)]
  plt(s, 1, TRUE,  pal = reds)
  m <- eval(parse(text=paste0("g", nrM)))
  s[[1]] = m[,c(7:1)]
  plt(s, 2, TRUE,  pal = greens)
  m <- eval(parse(text=paste0("b", nrM)))
  s[[1]] = m[,c(7:1)]
  plt(s, 3, TRUE, FALSE, pal = blues)
}

# from: cube1_ts_6x7_bigger.png
png("exp_ts.png", width = 2000, height = 600, pointsize = 24)
offset = 26
plot.new()
par(mar = c(3, 2, 7, 2))
plot.window(xlim = c(10, 50), ylim = c(-3, 10), asp = 1)
pl(s, 0, 0, nrM = 3)
pl(s, offset, 0, nrM = 2)
pl(s, 2 * offset, 0, nrM = 1)
# po <- matrix(c(0,-8,7,0,15,3.5,  0,1,1,5,5,14), ncol = 2)
heads <- matrix(c(3.5, 3.5 + offset, 3.5 + 2*offset, 14,14,14), ncol = 2)
points(heads, pch = 16) # 4 or 16
segments(c(-8, 7, 0, 15), c(-1,-1,3,3), 3.5, 14) # first stack pyramid
segments(c(-8, 7, 0, 15) + offset, c(-1,-1,3,3), 3.5 + offset, 14) # second stack pyramid
segments(c(-8, 7, 0, 15) + 2*offset, c(-1,-1,3,3), 3.5 + 2*offset, 14) # third stack pyramid
arrows(-13, 14, 72, 14, angle = 20, lwd = 2)  # timeline
text(7.5, 3.8, "x", col = "black")
text(-9, -2.5, "bands", srt = 90, col = "black")
text(-4.5, 1.5, "y", srt = 27.5, col = "black")
text(69, 15, "time", col = "black")
text(3.5, 15, "2020-10-01", col = "black")
text(3.5 + offset, 15, "2020-10-13", col = "black")
text(3.5 + 2*offset, 15, "2020-10-25", col = "black")
dev.off()

# resample ----

# time
# a word on spacing:
# 26/12 is the length on the time arrow for one day
# decide on a starting day, e.g. -2.5 aka 28.09. and type
# seq(-2.5, by = 26/12 * interval, length.out = 5)
png("exp_resample_time.png", width = 2500, height = 1000, pointsize = 24)
off = 26 # image stacks are always 26 apart
x = 160 # png X
y = 64 # png Y
off2 = 105 # xoffset to the right
yoff2 = 42 # 50 # second cubes have a yoffset from the original 0,0 cube
secText = 0.8 # secondary text size (dimension naming)
maskHeight = 27 # originally 30
plot.new()
par(mar = c(5,3,3,3))
plot.window(xlim = c(0, x), ylim = c(0, y), asp = 1)

pl(s, 0, yoff2, nrM = 3) # input 1
pl(s, off, yoff2, nrM = 2)
pl(s, 2 * off, yoff2, nrM = 1)
arrows(-13, 14 + yoff2, 72, 14 + yoff2, angle = 20, lwd = 2)  # timeline
heads <- matrix(c(3.5, 3.5 + off, 3.5 + 2*off, 14+yoff2,14+yoff2,14+yoff2), ncol = 2)
points(heads, pch = 16) # 4 or 16
segments(c(-8, 7, 0, 15), c(-1,-1,3,3)+yoff2, 3.5, 14+yoff2) # first stack pyramid
segments(c(-8, 7, 0, 15) + off, c(-1,-1,3,3)+yoff2, 3.5 + off, 14+yoff2) # second stack pyramid
segments(c(-8, 7, 0, 15) + 2*off, c(-1,-1,3,3)+yoff2, 3.5 + 2*off, 14+yoff2) # third stack pyramid
text(7.5, 4.3+yoff2, "x", col = "black", cex = secText)
text(-9.5, -2.5+yoff2, "bands", srt = 90, col = "black", cex = secText)
text(-4.5, 2+yoff2, "y", srt = 27.5, col = "black", cex = secText)
text(69, 15.5+yoff2, "time", col = "black")
text(3.5, 15.5+yoff2, "2020-10-01", col = "black")
text(3.5 + off, 15.5+yoff2, "2020-10-13", col = "black")
text(3.5 + 2*off, 15.5+yoff2, "2020-10-25", col = "black")

pl(s, 0 + off2, yoff2, nrM = 3) # input 2
pl(s, off + off2, yoff2, nrM = 2)
pl(s, 2 * off + off2, yoff2, nrM = 1)
arrows(-13 + off2, 14 + yoff2, 72 + off2, 14 + yoff2, angle = 20, lwd = 2)  # timeline
heads <- matrix(c(3.5+off2, 3.5 + off + off2, 3.5 + 2*off + off2, 14+yoff2,14+yoff2,14+yoff2), ncol = 2)
points(heads, pch = 16) # 4 or 16
segments(c(-8, 7, 0, 15)+off2, c(-1,-1,3,3)+yoff2, 3.5+off2, 14+yoff2) # first stack pyramid
segments(c(-8, 7, 0, 15) + off + off2, c(-1,-1,3,3)+yoff2, 3.5 + off + off2, 14+yoff2) # second stack pyramid
segments(c(-8, 7, 0, 15) + 2*off + off2, c(-1,-1,3,3)+yoff2, 3.5 + 2*off + off2, 14+yoff2) # third stack pyramid
text(7.5+off2, 4.3+yoff2, "x", col = "black", cex = secText)
text(-8.5+off2, -2.5+yoff2, "bands", srt = 90, col = "black", cex = secText)
text(-4.5+off2, 2+yoff2, "y", srt = 27.5, col = "black", cex = secText)
text(69+off2, 15.5+yoff2, "time", col = "black")
text(3.5+off2, 15.5+yoff2, "2020-10-01", col = "black")
text(3.5 + off + off2, 15.5+yoff2, "2020-10-13", col = "black")
text(3.5 + 2*off + off2, 15.5+yoff2, "2020-10-25", col = "black")

newDt = c(12.167,64.163)
arrows(-13, maskHeight, 72, maskHeight, angle = 20, lwd = 2)  # mask 1
heads <- matrix(c(newDt, maskHeight,maskHeight), ncol = 2) # 50
points(heads, pch = 16) # 4 or 16
text(newDt[1], maskHeight + 1.5, "2020-10-05", col = "black") # 3.5 is 01.10., two pix are 1 day
text(newDt[2], maskHeight + 1.5, "2020-10-29", col = "black")

pl(s, newDt[1] - 3.5, 0, nrM = 3) # out 1
pl(s, newDt[2] - 3.5, 0, nrM = 2)
arrows(-13, 14, 72, 14, angle = 20, lwd = 2)
segments(c(-8, 7, 0, 15)+8.67, c(-1,-1,3,3), 12.167, 14) # first stack pyramid
segments(c(-8, 7, 0, 15)+60.66, c(-1,-1,3,3), 64.163, 14) # second stack pyramid
heads <- matrix(c(newDt, 14,14), ncol = 2) # 50
points(heads, pch = 16) # 4 or 16
text(newDt[1], 15.5, "2020-10-05", col = "black") # 3.5 is 01.10., two pix are 1 day
text(newDt[2], 15.5, "2020-10-30", col = "black")
text(15.5, 4.3, "x", col = "black", cex = secText)
text(-1, -2.5, "bands", srt = 90, col = "black", cex = secText)
text(3.5, 2, "y", srt = 27.5, col = "black", cex = secText)
text(72.5, 11.5, "time", col = "black")

newDt = c(-2.5,14.83,32.167,49.5, 66.83)
arrows(-13 + off2, maskHeight, 72 + off2, maskHeight, angle = 20, lwd = 2)  # mask 2
heads <- matrix(c(c(newDt)+off2, maskHeight,maskHeight,maskHeight,maskHeight,maskHeight), ncol = 2) # 17
points(heads, pch = 16) # 4 or 16
text(newDt[1] + off2, maskHeight + 1.5, "2020-09-28", col = "black")
text(newDt[2] + off2, maskHeight + 1.5, "2020-10-06", col = "black")
text(newDt[3] + off2, maskHeight + 1.5, "2020-10-14", col = "black")
text(newDt[4] + off2, maskHeight + 1.5, "2020-10-22", col = "black")
text(newDt[5] + off2, maskHeight + 1.5, "2020-10-30", col = "black")

# pl(s, newDt[1] - 3.5 + off2, 0, nrM = 3) # out 2
pl(s, newDt[2] - 3.5 + off2, 0, nrM = 2)
pl(s, newDt[3] - 3.5 + off2, 0, nrM = 1)
pl(s, newDt[4] - 3.5 + off2, 0, nrM = 2)
pl(s, newDt[5] - 3.5 + off2, 0, nrM = 2)
arrows(-13 + off2, 14, 72 + off2, 14, angle = 20, lwd = 2)  # timeline
heads <- matrix(c(c(newDt)+off2, 14,14,14,14,14), ncol = 2) # 17
points(heads, pch = 16) # 4 or 16
text(newDt[1] + off2, 15.5, "2020-09-28", col = "black")
text(newDt[2] + off2, 15.5, "2020-10-06", col = "black")
text(newDt[3] + off2, 15.5, "2020-10-14", col = "black")
text(newDt[4] + off2, 15.5, "2020-10-22", col = "black")
text(newDt[5] + off2, 15.5, "2020-10-30", col = "black")
segments(c(-8, 7, 0, 15) + off2 + newDt[2]-3.5, c(-1,-1,3,3), 3.5 + off2 + newDt[2]-3.5, 14) # first stack pyramid
segments(c(-8, 7, 0, 15) + off2 + newDt[3]-3.5, c(-1,-1,3,3), 3.5 + off2 + newDt[3]-3.5, 14) # second stack pyramid
segments(c(-8, 7, 0, 15) + off2 + newDt[4]-3.5, c(-1,-1,3,3), 3.5 + off2 + newDt[4]-3.5, 14) # third stack pyramid
segments(c(-8, 7, 0, 15) + off2 + newDt[5]-3.5, c(-1,-1,3,3), 3.5 + off2 + newDt[5]-3.5, 14) # third stack pyramid
text(73.5 + off2, 11.5, "time", col = "black")
text(18+off2, 4.3, "x", col = "black", cex = secText)
text(1.5+off2, -2.5, "bands", srt = 90, col = "black", cex = secText)
text(6.5+off2, 2, "y", srt = 27.5, col = "black", cex = secText)

text(82, 50, "input", cex = 1.2) # headings
text(82, maskHeight, "resample", cex = 1.2)
text(82, 7, "output", cex = 1.2)
text(3.5 + off, 65, "Downsampling", cex = 1.8)
text(3.5 + off + off2, 65, "Upsampling", cex = 1.8)
dev.off()

# flat ----
# x, y, sheer: 1, 1, 0 ----
attr(s, "dimensions")[[1]]$delta = 1
attr(s, "dimensions")[[2]]$delta = 1
attr(attr(s, "dimensions"), "raster")$affine = c(0, 0.0)

pl = function(s, x, y, add = TRUE, randomize = FALSE, pal, m, print_geom = TRUE) {
  # m is matrix to replace image with
  # m <- t(m)
  attr(s, "dimensions")[[1]]$offset = x
  attr(s, "dimensions")[[2]]$offset = y
  # print(m)
  s[[1]] = m
  plt(s, 0, add = TRUE, pal = pal, print_geom = print_geom)
  #plot(s, text_values = TRUE)
}

png("exp_flat.png", width = 1000, height = 900, pointsize = 24)
plot.new()
par(mar = c(3,3,3,3))
plot.window(xlim = c(-2, 33), ylim = c(0, 25), asp = 1)
pl(s, 0, 0, pal = blues, m = b1)
pl(s, 0, 10, pal = blues, m = b2)
pl(s, 0, 20, pal = blues, m = b3)
pl(s, 7, 0, pal = greens, m = g1)
pl(s, 7, 10, pal = greens, m = g2)
pl(s, 7, 20, pal = greens, m = g3)
pl(s, 14, 0, pal = reds, m = r1)
pl(s, 14, 10, pal = reds, m = r2)
pl(s, 14, 20, pal = reds, m = r3)
pl(s, 21, 0, pal = purples, m = n1)
pl(s, 21, 10, pal = purples, m = n2)
pl(s, 21, 20, pal = purples, m = n3)
arrows(-1, 27, -1, 0, angle = 20, lwd = 2)
text(-2, 14, "time", srt = 90, col = "black")
text(3, 28, "blue", col = "black")
text(10, 28, "green", col = "black")
text(17, 28, "red", col = "black")
text(24, 28, "nir", col = "black")
text(31, 23.5, "2020-10-01", col = "black")
text(31, 13.5, "2020-10-13", col = "black")
text(31, 3.5, "2020-10-25", col = "black")
dev.off()

# reduce ----
print_grid <- function(x, y) {
  pl(s, 0+x, 0+y, pal = blues, m = b1)
  pl(s, 0+x, 10+y, pal = blues, m = b2)
  pl(s, 0+x, 20+y, pal = blues, m = b3)
  pl(s, 7+x, 0+y, pal = greens, m = g1)
  pl(s, 7+x, 10+y, pal = greens, m = g2)
  pl(s, 7+x, 20+y, pal = greens, m = g3)
  pl(s, 14+x, 0+y, pal = reds, m = r1)
  pl(s, 14+x, 10+y, pal = reds, m = r2)
  pl(s, 14+x, 20+y, pal = reds, m = r3)
  pl(s, 21+x, 0+y, pal = purples, m = n1)
  pl(s, 21+x, 10+y, pal = purples, m = n2)
  pl(s, 21+x, 20+y, pal = purples, m = n3)
}

print_alpha_grid <- function(x,y, alp = 0.2) {
  pl(s, 0+x, 0+y, pal = alpha(blues, alp), print_geom = FALSE,  m = b1)
  pl(s, 0+x, 10+y, pal = alpha(blues, alp), print_geom = FALSE,  m = b2)
  pl(s, 0+x, 20+y, pal = alpha(blues, alp), print_geom = FALSE,  m = b3)
  pl(s, 7+x, 0+y, pal = alpha(greens, alp), print_geom = FALSE,  m = g1)
  pl(s, 7+x, 10+y, pal = alpha(greens, alp), print_geom = FALSE,  m = g2)
  pl(s, 7+x, 20+y, pal = alpha(greens, alp), print_geom = FALSE,  m = g3)
  pl(s, 14+x, 0+y, pal = alpha(reds, alp), print_geom = FALSE,  m = r1)
  pl(s, 14+x, 10+y, pal = alpha(reds, alp), print_geom = FALSE,  m = r2)
  pl(s, 14+x, 20+y, pal = alpha(reds, alp), print_geom = FALSE,  m = r3)
  pl(s, 21+x, 0+y, pal = alpha(purples, alp), print_geom = FALSE,  m = n1)
  pl(s, 21+x, 10+y, pal = alpha(purples, alp), print_geom = FALSE,  m = n2)
  pl(s, 21+x, 20+y, pal = alpha(purples, alp), print_geom = FALSE,  m = n3)
}

# calc mean over time
timeB <- (b1 + b2 + b3) / 3
timeG <- (g1 + g2 + g3) / 3
timeR <- (r1 + r2 + r3) / 3
timeN <- (n1 + n2 + n3) / 3

print_grid_time <- function(x, y) { # 3x1, 28x7
  pl(s, 0+x, 10+y, pal = blues, m = timeB)
  pl(s, 7+x, 10+y, pal = greens, m = timeG)
  pl(s, 14+x, 10+y, pal = reds, m = timeR)
  pl(s, 21+x, 10+y, pal = purples, m = timeN)
}

# calc ndvi
ndvi1 <- (n1 - r1) / (n1 + r1)
ndvi2 <- (n2 - r2) / (n2 + r2)
ndvi3 <- (n3 - r3) / (n3 + r3)

print_grid_bands <- function(x, y, pal = greys) { # 1x3 6x27
  pl(s, 0+x, 0+y, pal = pal, m = ndvi1)
  pl(s, 0+x, 10+y, pal = pal, m = ndvi2)
  pl(s, 0+x, 20+y, pal = pal, m = ndvi3)
}

plte = function(s, x, y, add = TRUE, randomize = FALSE, pal, m) {
  attr(s, "dimensions")[[1]]$offset = x
  attr(s, "dimensions")[[2]]$offset = y
  # m = r[[1]][y + 1:nrow,x + 1:ncol,1]
  # dim(m) = c(x = nrow, y = ncol) # named dim
  # s[[1]] = m
  # me <- floor(mean(s[[1]]))
  me <- floor(mean(m))
  if (me[1] > 100) { # in case non-artificial grids with very high
    me <- m / 10     # numbers are used, make them smaller
    me <- floor(mean(me))
  }
  text(x,y,me)
}

print_grid_spat <- function(x, y) {
  x = x + 3
  y = y + 3.5
  plte(s, 0+x, 0+y, pal = blues, m = b1)
  plte(s, 0+x, 10+y, pal = blues, m = b2)
  plte(s, 0+x, 20+y, pal = blues, m = b3)
  plte(s, 7+x, 0+y, pal = greens, m = g1)
  plte(s, 7+x, 10+y, pal = greens, m = g2)
  plte(s, 7+x, 20+y, pal = greens, m = g3)
  plte(s, 14+x, 0+y, pal = reds, m = r1)
  plte(s, 14+x, 10+y, pal = reds, m = r2)
  plte(s, 14+x, 20+y, pal = reds, m = r3)
  plte(s, 21+x, 0+y, pal = purples, m = n1)
  plte(s, 21+x, 10+y, pal = purples, m = n2)
  plte(s, 21+x, 20+y, pal = purples, m = n3)
}

png("exp_reduce.png", width = 1200, height = 1000, pointsize = 32)
plot.new()
par(mar = c(3,3,3,3))
x = 120
y = 100
plot.window(xlim = c(0, x), ylim = c(0, y), asp = 1)
print_grid(x/2-28/2,y-27)
# print_alpha_grid((x/3-28)/2, 0) # alpha grid
print_grid_time((x/3-28)/2, 0) # off = 5.5
# print_alpha_grid(x/3+((x/3-6)/2) -10.5, 0) # alpha grid
print_grid_bands(x/3+((x/3-6)/2), 0)
print_alpha_grid(2*(x/3)+((x/3-28)/2), 0) # alpha grid
print_grid_spat(2*(x/3)+((x/3-28)/2), 0)
text(3, 13.5, "time", srt = 90, col = "black")
segments(3.6, 8, 3.7, 19, lwd=3)
text(43, 13.5, "time", srt = 90, col = "black")
text(83, 13.5, "time", srt = 90, col = "black")
text(20, 30, "bands", col = "black")
text(60, 30, "bands", col = "black")
segments(53,29.8, 67,29.8, lwd=3)
text(100, 30, "bands", col = "black")
arrows(x/2-28/2,y-30, x/6,32, angle = 20, lwd = 2)
arrows(x/2,y-30, x/2,32, angle = 20, lwd = 2)
arrows(x/2+28/2,y-30, 100, 32, angle = 20, lwd = 2)
# points(seq(1,120,10), seq(1,120,10))
text(28.5,49, "reduce temporally", srt = 55.5, col = "black", cex = 0.8)
text(57,49, "reduce bands", srt = 90, col = "black", cex = 0.8)
text(91.5,49, "reduce spatially", srt = -55.5, col = "black", cex = 0.8)
dev.off()

# filter ----
# mask <- matrix(c(rep(NA, 26), 1,NA,1,NA,1,1,1, rep(NA, 9)), ncol = 7)
mask <- matrix(c(NA,NA,NA,NA,NA,NA,
                 NA,NA,NA,NA,NA,NA,
                 NA,NA,NA, 1, 1, 1,
                 NA,NA, 1, 1, 1,NA,
                 NA,NA,NA, 1, 1,NA,
                 NA,NA,NA,NA,NA,NA,
                 NA,NA,NA,NA,NA,NA), ncol = 7)

print_grid_filter <- function(x, y) {
  pl(s, 0+x, 0+y, pal = blues, m = b1 & mask)
  pl(s, 0+x, 10+y, pal = blues, m = b2 & mask)
  pl(s, 0+x, 20+y, pal = blues, m = b3 & mask)
  pl(s, 7+x, 0+y, pal = greens, m = g1 & mask)
  pl(s, 7+x, 10+y, pal = greens, m = g2 & mask)
  pl(s, 7+x, 20+y, pal = greens, m = g3 & mask)
  pl(s, 14+x, 0+y, pal = reds, m = r1 & mask)
  pl(s, 14+x, 10+y, pal = reds, m = r2 & mask)
  pl(s, 14+x, 20+y, pal = reds, m = r3 & mask)
  pl(s, 21+x, 0+y, pal = purples, m = n1 & mask)
  pl(s, 21+x, 10+y, pal = purples, m = n2 & mask)
  pl(s, 21+x, 20+y, pal = purples, m = n3 & mask)
}

print_grid_time_filter <- function(x, y) { # 3x1, 28x7
  pl(s, 0+x, 10+y, pal = blues, m = b3)
  pl(s, 7+x, 10+y, pal = greens, m = g3)
  pl(s, 14+x, 10+y, pal = reds, m = r3)
  pl(s, 21+x, 10+y, pal = purples, m = n3)
}

print_grid_bands_filter <- function(x, y, pal = greys) { # 1x3 6x27
  pl(s, 0+x, 0+y, pal = pal, m = n1)
  pl(s, 0+x, 10+y, pal = pal, m = n2)
  pl(s, 0+x, 20+y, pal = pal, m = n3)
}

# build exactly like reduce
png("exp_filter.png", width = 1200, height = 1000, pointsize = 32)
plot.new()
par(mar = c(3,3,3,3))
x = 120
y = 100
plot.window(xlim = c(0, x), ylim = c(0, y), asp = 1)
print_grid(x/2-28/2,y-27)
print_alpha_grid((x/3-28)/2, 0) # alpha grid
print_grid_time_filter((x/3-28)/2, -10) # select 3rd
print_alpha_grid(x/3+((x/3-6)/2) -10.5, 0) # alpha grid
print_grid_bands_filter(x/3+((x/3-12.4)), 0, pal = purples)
print_alpha_grid(2*(x/3)+((x/3-28)/2), 0) # alpha grid
print_grid_filter(2*(x/3)+((x/3-28)/2), 0)
text(3, 13.5, "time", srt = 90, col = "black")
text(43, 13.5, "time", srt = 90, col = "black")
text(83, 13.5, "time", srt = 90, col = "black")
text(20, 30, "bands", col = "black")
text(60, 30, "bands", col = "black")
text(100, 30, "bands", col = "black")
arrows(x/2-28/2,y-30, x/6,32, angle = 20, lwd = 2)
arrows(x/2,y-30, x/2,32, angle = 20, lwd = 2)
arrows(x/2+28/2,y-30, 100, 32, angle = 20, lwd = 2)
# points(seq(1,120,10), seq(1,120,10))
text(28.5,49, "filter temporally", srt = 55.5, col = "black", cex = 0.8)
text(57,49, "filter bands", srt = 90, col = "black", cex = 0.8)
text(91.5,49, "filter spatially", srt = -55.5, col = "black", cex = 0.8)
dev.off()

# apply ----
print_text = function(s, x, y, m) {
  # m <- t(m) # transverse for correct order
  # print(m)
  r <- rep(seq(0.5, 5.5, 1), 7)
  r <- r + x # consider offsets
  u <- c(rep(0.5, 6), rep(1.5, 6), rep(2.5, 6), 
         rep(3.5, 6), rep(4.5, 6), rep(5.5, 6), rep(6.5, 6))
  u <- u + y # offset
  tab <- matrix(c(r,u), nrow = 42, byrow = FALSE) # make point table
  for (i in 1:42) {
    text(tab[i, 1], tab[i, 2], labels = paste0("", m[i]), cex = 1.1)
    }
}

png("exp_apply_wide_unary.png", width = 2400, height = 1000, pointsize = 24)
plot.new()
par(mar = c(2,2,2,2))
x = 30
y = 7.5
plot.window(xlim = c(0, x), ylim = c(0, y), asp = 1)
pl(s, 3, 2, pal = blues, m = b3 - 300)
pl(s, 1.5, .5, pal = blues, m = b2 - 300)
pl(s, 0, -1, pal = blues, m = b1 - 300)
print_text(s, 0, -1, m = b1 - 300)
pl(s, 23, 2, pal = blues, m = abs(b3 - 300))
pl(s, 21.5, 0.5, pal = blues, m = abs(b2 - 300))
pl(s, 20, -1, pal = blues, m = abs(b1 - 300))
print_text(s, 20, -1, m = abs(b1 - 300))
arrows(11, 4, 17.5, 4, lwd = 3)
text(14.3, 3.5, "absolute()", cex = 1.4)
dev.off()

draw_vNeumann <- function(x, y) {
  seg <- matrix(c(c(0,0,1,1,2,2,1,1,0,0,-1,-1), c(0,-1,-1,0,0,1,1,2,2,1,1,0), 
                  c(0,1,1,2,2,1,1,0,0,-1,-1,0), c(-1,-1,0,0,1,1,2,2,1,1,0,0)), ncol = 4)
  seg[,1] <- seg[,1] + x
  seg[,3] <- seg[,3] + x
  seg[,2] <- seg[,2] + y
  seg[,4] <- seg[,4] + y
  return(seg)
}

apply_filter <- function(input, pad = TRUE, padValue = 1) {
  ras <- focal(raster(input), w = matrix(c(0,0.2,0, 0.2,0.2,0.2, 0,0.2,0), ncol = 3), pad = pad, padValue = padValue)
  ras <- as.matrix(ras)
  ras[ras == "NaN"] <- -999
  return(floor(ras))
}

png("exp_apply_wide_kernel.png", width = 2400, height = 1000, pointsize = 24)
plot.new()
par(mar = c(2,2,2,2))
x = 30
y = 7.5
plot.window(xlim = c(0, x), ylim = c(0, y), asp = 1)
pl(s, 3, 2, pal = blues, m = b3)
pl(s, 1.5, .5, pal = blues, m = b2)
pl(s, 0, -1, pal = blues, m = b1)
print_text(s, 0, -1, m = b1) # print text on left first stack
seg1 <- draw_vNeumann(2, 3)
segments(seg1[,1], seg1[,2], seg1[,3], seg1[,4], lwd = 3)
pl(s, 23, 2, pal = blues, m = apply_filter(b3))
pl(s, 21.5, 0.5, pal = blues, m = apply_filter(b2))
pl(s, 20, -1, pal = blues, m = apply_filter(b1))
print_text(s, 20, -1, m = apply_filter(b1)) # set pad = FALSE for -99
seg1 <- draw_vNeumann(22, 3)
segments(seg1[,1], seg1[,2], seg1[,3], seg1[,4], lwd = 3)
arrows(11, 4, 17.5, 4, lwd = 3)
text(14.3, 3.5, "apply_kernel()", cex = 1.4)
seg1 <- draw_vNeumann(13.8, 1)
segments(seg1[,1], seg1[,2], seg1[,3], seg1[,4], lwd = 3)
text(14.3, 1.5, "0.2", cex = 1.3)
text(13.3, 1.5, "0.2", cex = 1.3)
text(15.3, 1.5, "0.2", cex = 1.3)
text(14.3, 2.5, "0.2", cex = 1.3)
text(14.3, .5, "0.2", cex = 1.3)
dev.off()

draw_arrow <- function(x, y) {
  seg <- matrix(c(c(-0.5,0,1.5,3), c(-0.5,0,1.5,3),
                  c(-.9,1,2.5,3.7), c(-.9,1,2.5,3.7)), ncol = 4)
  seg[,1] <- seg[,1] + x
  seg[,3] <- seg[,3] + x
  seg[,2] <- seg[,2] + y
  seg[,4] <- seg[,4] + y
  segments(seg[,1], seg[,2], seg[,3], seg[,4], lwd = 3)
}

png("exp_apply_wide_ts.png", width = 2400, height = 1000, pointsize = 24)
plot.new()
par(mar = c(2,2,2,2))
x = 30
y = 7.5
plot.window(xlim = c(0, x), ylim = c(0, y), asp = 1)
pl(s, 3, 2, pal = blues, m = b3)
print_text(s, 3, 2, m = b3)
pl(s, 1.5, .5, pal = blues, m = b2)
print_text(s, 1.5, .5, m = b2)
pl(s, 0, -1, pal = blues, m = b1)
print_text(s, 0, -1, m = b1) # print text on left first stack
pl(s, 23, 2, pal = alpha(blues, 0.1), m = matrix(rep("NA", 42), ncol = 7))
pl(s, 21.5, 0.5, pal = blues, m = (b1 + b2 + b3) / 3)
print_text(s, 21.5, .5, m = floor((b1 + b2 + b3) / 3))
pl(s, 20, -1, pal = alpha(blues, 0.1), m = matrix(rep("NA", 42), ncol = 7))
draw_arrow(5.7, 1.7)
arrows(11, 8, 17.5, 8, lwd = 3)
text(14.3, 7.5, "apply_dimension(dimension = 't')", cex = 1.4)
draw_arrow(9.7, 1.7) # draw ma explanation
text(-0.5 + 10, -0.5 + 2, "496")
text(1 + 10, 1 + 2, "470")
text(2.5 + 10, 2.5 + 2, "678")
t_formula <- expression("t"[n]*" = (t"[n-1]*" + t"[n]*" + t"[n+1]*") / 3")
text(14.3, 3, t_formula)
draw_arrow(16.5, 1.7) # draw ma explanation
text(-0.5 + 16.7, -0.5 + 2, "NA")
text(1 + 16.7, 1 + 2, "548")
text(2.5 + 16.7, 2.5 + 2, "NA")
# draw_arrow(25.7, 1.7)
dev.off()

# heads <- matrix(c(1,2,3,4,5,6, 1,2,3,4,5,6), ncol = 2)
# points(heads, pch = 16) # 4 or 16